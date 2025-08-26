/**
 * Recurring Events Service
 * Handles creation, management, and synchronization of recurring Portuguese cultural events
 * Integrates with existing event system while maintaining cultural authenticity
 */

import { Event, eventService } from "./events";
import {
  RecurringEventTemplate,
  RecurrenceInstance,
  generateRecurrenceOccurrences,
  validateCulturalAuthenticity,
  RECURRING_EVENT_TEMPLATES,
} from "@/config/recurring-events";
import { supabase } from "./supabase";

export interface RecurringEventSeries {
  id: string;
  templateId: string;
  name: { en: string; pt: string };
  description: { en: string; pt: string };
  organizerId: string;
  organizerName: string;
  status: "active" | "paused" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;

  // Series settings
  startDate: string;
  endDate?: string;
  maxOccurrences?: number;

  // Event defaults
  venue: string;
  capacity: number;
  price: number;
  membershipRequired: "free" | "core" | "premium";

  // Cultural validation
  culturalValidation: {
    isValid: boolean;
    warnings: string[];
    lastValidated: string;
  };

  // Instances
  instances: RecurrenceInstance[];
  nextOccurrence?: string;
  totalOccurrences: number;
  completedOccurrences: number;
}

export interface RecurringEventStats {
  totalSeries: number;
  activeSeries: number;
  totalUpcomingEvents: number;
  popularTemplates: {
    templateId: string;
    name: { en: string; pt: string };
    usageCount: number;
    averageRating: number;
  }[];
  monthlySchedule: {
    month: string;
    eventsCount: number;
    culturalCelebrations: number;
  }[];
}

class RecurringEventsService {
  /**
   * Create a new recurring event series
   */
  async createRecurringEventSeries(
    templateId: string,
    organizerId: string,
    organizerName: string,
    customizations: {
      name?: { en: string; pt: string };
      description?: { en: string; pt: string };
      startDate: string;
      venue: string;
      capacity: number;
      price: number;
      membershipRequired: "free" | "core" | "premium";
      endDate?: string;
      maxOccurrences?: number;
    }
  ): Promise<{ success: boolean; seriesId?: string; error?: string }> {
    try {
      // Get the template
      const template = RECURRING_EVENT_TEMPLATES.find(
        (t) => t.id === templateId
      );
      if (!template) {
        return { success: false, error: "Template not found" };
      }

      // Validate cultural authenticity
      const validation = validateCulturalAuthenticity(template, customizations);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Cultural authenticity validation failed: ${validation.warnings.join(", ")}`,
        };
      }

      // Generate instances
      const startDate = new Date(customizations.startDate);
      const occurrences = generateRecurrenceOccurrences(
        template.pattern,
        startDate,
        customizations.maxOccurrences || 12
      );

      const instances: RecurrenceInstance[] = occurrences.map((date) => {
        const custom: RecurrenceInstance["customizations"] = {};
        if (customizations.name) custom.title = customizations.name;
        if (customizations.description)
          custom.description = customizations.description;
        if (customizations.venue) custom.venue = customizations.venue;
        if (typeof customizations.capacity === "number")
          custom.capacity = customizations.capacity;
        if (typeof customizations.price === "number")
          custom.price = customizations.price;

        return {
          id: `${templateId}-${date.getTime()}`,
          templateId,
          occurrenceDate: date.toISOString(),
          status: "scheduled",
          customizations: custom,
        };
      });

      // Create the series in database
      const baseSeries: RecurringEventSeries = {
        id: `series_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        templateId,
        name: customizations.name || template.name,
        description: customizations.description || template.description,
        organizerId,
        organizerName,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startDate: customizations.startDate,
        venue: customizations.venue,
        capacity: customizations.capacity,
        price: customizations.price,
        membershipRequired: customizations.membershipRequired,
        culturalValidation: {
          isValid: validation.isValid,
          warnings: validation.warnings,
          lastValidated: new Date().toISOString(),
        },
        instances,
        totalOccurrences: instances.length,
        completedOccurrences: 0,
      };

      // Add optional fields only when defined (respect exactOptionalPropertyTypes)
      const series: RecurringEventSeries = {
        ...baseSeries,
        ...(customizations.endDate ? { endDate: customizations.endDate } : {}),
        ...(typeof customizations.maxOccurrences === "number"
          ? { maxOccurrences: customizations.maxOccurrences }
          : {}),
        ...(instances.length > 0 && instances[0] && instances[0].occurrenceDate
          ? { nextOccurrence: instances[0].occurrenceDate }
          : {}),
      };

      // Store in database (this would be a real database call in production)
      const { data, error } = await supabase
        .from("recurring_event_series")
        .insert([series])
        .select()
        .single();

      if (error) {
        console.error("Database error creating recurring series:", error);
        return { success: false, error: "Failed to create series in database" };
      }

      // Create the first few actual events
      await this.generateUpcomingEvents(series.id, 3);

      return { success: true, seriesId: series.id };
    } catch (error) {
      console.error("Error creating recurring event series:", error);
      return { success: false, error: "Internal server error" };
    }
  }

  /**
   * Generate upcoming events from recurring series
   */
  async generateUpcomingEvents(
    seriesId: string,
    count: number = 3
  ): Promise<Event[]> {
    try {
      // Get the series
      const { data: series, error } = await supabase
        .from("recurring_event_series")
        .select("*")
        .eq("id", seriesId)
        .single();

      if (error || !series) {
        throw new Error("Series not found");
      }

      const template = RECURRING_EVENT_TEMPLATES.find(
        (t) => t.id === series.templateId
      );
      if (!template) {
        throw new Error("Template not found");
      }

      // Get upcoming instances that haven't been created as events yet
      const upcomingInstances = series.instances
        .filter(
          (instance: RecurrenceInstance) =>
            instance.status === "scheduled" &&
            new Date(instance.occurrenceDate) > new Date()
        )
        .slice(0, count);

      const createdEvents: Event[] = [];

      for (const instance of upcomingInstances) {
        const eventDate = new Date(instance.occurrenceDate);
        const eventDateStr =
          eventDate.toISOString().split("T")[0] ||
          new Date().toISOString().split("T")[0];

        const event: Partial<Event> = {
          title: instance.customizations?.title
            ? typeof instance.customizations.title === "string"
              ? instance.customizations.title
              : instance.customizations.title.en
            : template.name.en,
          description: instance.customizations?.description
            ? typeof instance.customizations.description === "string"
              ? instance.customizations.description
              : instance.customizations.description.en
            : template.description.en,
          longDescription: `${template.description.en}\n\nThis is part of a recurring cultural event series celebrating Portuguese heritage.`,
          date: eventDateStr,
          time: "19:00", // Default time, could be configurable
          endTime: "22:00", // Based on template duration
          location: instance.customizations?.venue || series.venue,
          address: template.venues.primary, // Would need more sophisticated venue mapping
          category: template.category,
          tags: [
            ...template.eventDefaults.tags,
            "recurring-event",
            "portuguese-culture",
          ],
          hostId: series.organizerId,
          hostName: series.organizerName,
          membershipRequired:
            instance.customizations?.membershipRequired ||
            series.membershipRequired,
          price: instance.customizations?.price || series.price,
          currency: "GBP",
          maxAttendees: instance.customizations?.capacity || series.capacity,
          currentAttendees: 0,
          waitlistCount: 0,
          status: "published",
          featured: template.featured,
          images: template.marketingAssets.images,
          allowWaitlist: true,
          maxWaitingList: Math.floor(
            (instance.customizations?.capacity || series.capacity) * 0.5
          ),
          requiresApproval: false,
          lastBookingTime: new Date(
            eventDate.getTime() - 2 * 60 * 60 * 1000
          ).toISOString(), // 2 hours before
          isRecurring: true,
          recurringPattern: {
            frequency: template.pattern.type as any,
            interval: template.pattern.interval,
            endDate: series.endDate,
          },
          views: 0,
          favorites: 0,
          shares: 0,
          communityGuidelines: true,
          verifiedEvent: true,
          reportCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: series.organizerId,
          attendees: [],
          waitlist: [],
          reviews: [],
          averageRating: 0,
          totalReviews: 0,
          photos: [],
        };

        // Create the event using the existing event service
        const createdEvent = await eventService.createEvent(
          event as Event,
          series.organizerId
        );
        if (createdEvent) {
          createdEvents.push(createdEvent);

          // Update instance status
          await supabase
            .from("recurring_event_series")
            .update({
              instances: series.instances.map((inst: RecurrenceInstance) =>
                inst.id === instance.id
                  ? { ...inst, status: "published" }
                  : inst
              ),
              updatedAt: new Date().toISOString(),
            })
            .eq("id", seriesId);
        }
      }

      return createdEvents;
    } catch (error) {
      console.error("Error generating upcoming events:", error);
      return [];
    }
  }

  /**
   * Get all recurring event series
   */
  async getRecurringSeries(filters?: {
    organizerId?: string;
    status?: RecurringEventSeries["status"];
    templateId?: string;
  }): Promise<RecurringEventSeries[]> {
    try {
      let query = supabase.from("recurring_event_series").select("*");

      if (filters?.organizerId) {
        query = query.eq("organizerId", filters.organizerId);
      }
      if (filters?.status) {
        query = query.eq("status", filters.status);
      }
      if (filters?.templateId) {
        query = query.eq("templateId", filters.templateId);
      }

      const { data, error } = await query.order("createdAt", {
        ascending: false,
      });

      if (error) {
        console.error("Error fetching recurring series:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error in getRecurringSeries:", error);
      return [];
    }
  }

  /**
   * Get statistics for recurring events
   */
  async getRecurringEventStats(): Promise<RecurringEventStats> {
    try {
      const series = await this.getRecurringSeries();
      const activeSeries = series.filter((s) => s.status === "active");

      // Calculate upcoming events
      const totalUpcomingEvents = activeSeries.reduce(
        (sum, s) =>
          sum +
          s.instances.filter(
            (i) =>
              i.status === "scheduled" &&
              new Date(i.occurrenceDate) > new Date()
          ).length,
        0
      );

      // Calculate popular templates
      const templateUsage = series.reduce(
        (acc, s) => {
          acc[s.templateId] = (acc[s.templateId] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const popularTemplates = Object.entries(templateUsage)
        .map(([templateId, usageCount]) => {
          const template = RECURRING_EVENT_TEMPLATES.find(
            (t) => t.id === templateId
          );
          return {
            templateId,
            name: template?.name || { en: "Unknown", pt: "Desconhecido" },
            usageCount,
            averageRating: 4.5, // Would calculate from actual ratings
          };
        })
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 5);

      // Calculate monthly schedule (simplified)
      const monthlySchedule = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2025, i, 1).toLocaleString("en", { month: "long" }),
        eventsCount: Math.floor(Math.random() * 20) + 5, // Would calculate from actual data
        culturalCelebrations: Math.floor(Math.random() * 5) + 1,
      }));

      return {
        totalSeries: series.length,
        activeSeries: activeSeries.length,
        totalUpcomingEvents,
        popularTemplates,
        monthlySchedule,
      };
    } catch (error) {
      console.error("Error getting recurring event stats:", error);
      return {
        totalSeries: 0,
        activeSeries: 0,
        totalUpcomingEvents: 0,
        popularTemplates: [],
        monthlySchedule: [],
      };
    }
  }

  /**
   * Update a recurring event series
   */
  async updateRecurringSeries(
    seriesId: string,
    updates: Partial<RecurringEventSeries>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from("recurring_event_series")
        .update({
          ...updates,
          updatedAt: new Date().toISOString(),
        })
        .eq("id", seriesId);

      if (error) {
        console.error("Database error updating series:", error);
        return { success: false, error: "Failed to update series" };
      }

      return { success: true };
    } catch (error) {
      console.error("Error updating recurring series:", error);
      return { success: false, error: "Internal server error" };
    }
  }

  /**
   * Cancel a recurring event series
   */
  async cancelRecurringSeries(
    seriesId: string,
    reason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Update series status
      await this.updateRecurringSeries(seriesId, {
        status: "cancelled",
        updatedAt: new Date().toISOString(),
      });

      // Cancel all future events in this series
      // This would require integration with the event service to cancel related events

      return { success: true };
    } catch (error) {
      console.error("Error cancelling recurring series:", error);
      return { success: false, error: "Internal server error" };
    }
  }

  /**
   * Validate and refresh cultural authenticity for series
   */
  async validateSeriesCulturalAuthenticity(seriesId: string): Promise<{
    isValid: boolean;
    warnings: string[];
    suggestions: string[];
  }> {
    try {
      const series = await this.getRecurringSeries();
      const targetSeries = series.find((s) => s.id === seriesId);

      if (!targetSeries) {
        return {
          isValid: false,
          warnings: ["Series not found"],
          suggestions: [],
        };
      }

      const template = RECURRING_EVENT_TEMPLATES.find(
        (t) => t.id === targetSeries.templateId
      );
      if (!template) {
        return {
          isValid: false,
          warnings: ["Template not found"],
          suggestions: [],
        };
      }

      const validation = validateCulturalAuthenticity(template);

      // Update series with validation results
      await this.updateRecurringSeries(seriesId, {
        culturalValidation: {
          isValid: validation.isValid,
          warnings: validation.warnings,
          lastValidated: new Date().toISOString(),
        },
      });

      return validation;
    } catch (error) {
      console.error("Error validating series cultural authenticity:", error);
      return {
        isValid: false,
        warnings: ["Validation error"],
        suggestions: [],
      };
    }
  }
}

// Export singleton instance
export const recurringEventsService = new RecurringEventsService();
