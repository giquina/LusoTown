import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { CULTURAL_EVENTS, getFeaturedEvents } from "@/config/cultural-events";
import { LUSOPHONE_CELEBRATIONS } from "@/config/lusophone-celebrations";
import logger from '@/utils/logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6");
    const category = searchParams.get("category") || "all";
    const location = searchParams.get("location") || "all";

    // Get featured events from config
    const featuredConfigEvents = getFeaturedEvents().slice(0, limit);

    // Add some sample events with Portuguese community focus
    const sampleEvents = [
      {
        id: "fado-night-001",
        title: {
          en: "Traditional Fado Night",
          pt: "Noite de Fado Tradicional",
        },
        description: {
          en: "Experience authentic Portuguese Fado music in the heart of London",
          pt: "Experiencie a música tradicional portuguesa no coração de Londres",
        },
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: "20:00",
        location: {
          name: "Portuguese Club London",
          address: "123 Portuguese Street, London SW1",
          coordinates: { lat: 51.5074, lng: -0.1278 },
        },
        category: "Arts & Culture",
        price: { amount: 15, currency: "GBP", type: "paid" },
        tags: ["fado", "music", "portuguese", "traditional"],
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        organizer: "Portuguese Cultural Association",
        capacity: 80,
        attendees: 45,
        featured: true,
        countries: ["Portugal"],
        flagEmoji: "🇵🇹",
      },
      {
        id: "brazilian-festival-002",
        title: {
          en: "Brazilian Cultural Festival",
          pt: "Festival Cultural Brasileiro",
        },
        description: {
          en: "Celebrate Brazilian culture with music, dance, and authentic cuisine",
          pt: "Celebre a cultura brasileira com música, dança e culinária autêntica",
        },
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        time: "14:00",
        location: {
          name: "Hyde Park",
          address: "Hyde Park, London W2",
          coordinates: { lat: 51.5074, lng: -0.1657 },
        },
        category: "Festival",
        price: { amount: 0, currency: "GBP", type: "free" },
        tags: ["brazil", "festival", "samba", "capoeira"],
        imageUrl:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
        organizer: "Brazilian Community UK",
        capacity: 500,
        attendees: 234,
        featured: true,
        countries: ["Brazil"],
        flagEmoji: "🇧🇷",
      },
      {
        id: "kizomba-night-003",
        title: {
          en: "Kizomba Dance Night",
          pt: "Noite de Kizomba",
        },
        description: {
          en: "Learn and dance to the sensual rhythms of Kizomba from Angola",
          pt: "Aprenda e dance ao ritmo sensual da Kizomba de Angola",
        },
        date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        time: "19:30",
        location: {
          name: "East London Community Center",
          address: "456 Community Road, London E1",
          coordinates: { lat: 51.5155, lng: -0.0707 },
        },
        category: "Dance",
        price: { amount: 12, currency: "GBP", type: "paid" },
        tags: ["kizomba", "angola", "dance", "african"],
        imageUrl:
          "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
        organizer: "Angolan Cultural Society",
        capacity: 60,
        attendees: 38,
        featured: true,
        countries: ["Angola"],
        flagEmoji: "🇦🇴",
      },
      {
        id: "morna-festival-004",
        title: {
          en: "Cape Verdean Morna Festival",
          pt: "Festival de Morna Cabo-Verdiana",
        },
        description: {
          en: "Immerse yourself in the soulful sounds of Cape Verdean Morna music",
          pt: "Mergulhe nos sons melancólicos da música Morna cabo-verdiana",
        },
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
        time: "18:30",
        location: {
          name: "South London Cultural Center",
          address: "789 Cultural Avenue, London SE1",
          coordinates: { lat: 51.4994, lng: -0.127 },
        },
        category: "Music",
        price: { amount: 18, currency: "GBP", type: "paid" },
        tags: ["morna", "cape-verde", "music", "traditional"],
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        organizer: "Cape Verdean Association London",
        capacity: 120,
        attendees: 67,
        featured: true,
        countries: ["Cape Verde"],
        flagEmoji: "🇨🇻",
      },
    ];

    // Filter by category if specified
    let filteredEvents = sampleEvents;
    if (category !== "all") {
      filteredEvents = sampleEvents.filter((event) =>
        event.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Limit results
    const events = filteredEvents.slice(0, limit);

    return NextResponse.json({
      success: true,
      events,
      total: events.length,
      page: 1,
      limit,
      filters: { category, location },
    });
  } catch (error) {
    logger.error("Featured events API error", error, { 
      area: 'events', 
      culturalContext: 'lusophone',
      action: 'fetch_featured_events' 
    });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured events",
        events: [],
      },
      { status: 500 }
    );
  }
}
