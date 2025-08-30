"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircleIcon,
  SparklesIcon,
  HeartIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const MEMBERSHIP_CONFIG = {
  cultural: {
    title: "Cultural Membership Application",
    icon: SparklesIcon,
    color: "primary",
    description:
      "Your application to join London's most exclusive Portuguese-speaking cultural circle",
    benefits: [
      "Private Fado nights and Lusophone cultural events",
      "Access to PALOP heritage celebrations",
      "Brazilian cultural festivals and gatherings",
      "Portuguese language preservation activities",
      "Cultural education workshops and seminars",
    ],
    nextSteps: [
      "Cultural committee review (2-3 business days)",
      "Heritage verification if required",
      "Welcome orientation and community introduction",
      "First cultural event invitation",
    ],
  },
  social: {
    title: "Social Membership Application",
    icon: HeartIcon,
    color: "rose",
    description:
      "Your application to join our elite Lusophone dating community",
    benefits: [
      "AI-powered cultural compatibility matching",
      "VIP dating events and social mixers",
      "Portuguese wine tastings and cultural dates",
      "Exclusive access to accomplished Portuguese speakers",
      "Safe, verified community environment",
    ],
    nextSteps: [
      "Profile review and verification (2-3 business days)",
      "Safety background check completion",
      "Welcome orientation and platform tutorial",
      "First match recommendations and event invitations",
    ],
  },
  community: {
    title: "Community Membership Application",
    icon: UserGroupIcon,
    color: "blue",
    description:
      "Your application to join the UK's premier Portuguese-speaking community",
    benefits: [
      "Access to UK-wide Portuguese speaker network",
      "Regional meetups and cultural celebrations",
      "Community support for housing, jobs, and services",
      "Family events and children's cultural programs",
      "Volunteer and mentorship opportunities",
    ],
    nextSteps: [
      "Community team review (2-3 business days)",
      "Regional coordinator introduction",
      "Welcome orientation and community guidelines",
      "First local meetup invitation",
    ],
  },
  business: {
    title: "Business Membership Application",
    icon: BuildingOfficeIcon,
    color: "emerald",
    description:
      "Your application to join the UK's premier Lusophone business network",
    benefits: [
      "Access to global Portuguese-speaking markets",
      "Executive networking events and business dinners",
      "Market intelligence and business insights",
      "Investment and partnership opportunities",
      "Cultural business consulting services",
    ],
    nextSteps: [
      "Business credentials verification (3-5 business days)",
      "Market interests assessment and matching",
      "Welcome orientation and platform introduction",
      "First business networking event invitation",
    ],
  },
};

function MembershipSuccessPageInner() {
  const router = useRouter();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const membershipType =
    (searchParams.get("type") as keyof typeof MEMBERSHIP_CONFIG) || "community";

  const [timeUntilRedirect, setTimeUntilRedirect] = useState(10);
  const [applicationData, setApplicationData] = useState<any>(null);

  const config = MEMBERSHIP_CONFIG[membershipType];
  const Icon = config.icon;

  // Load application data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(
        `${membershipType}-membership-application`
      );
      if (saved) {
        setApplicationData(JSON.parse(saved));
      }
    }
  }, [membershipType]);

  // Countdown timer for redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilRedirect((prev) => {
        if (prev <= 1) {
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for applying to LusoTown's {config.title.toLowerCase()}.
            We're excited to review your application and welcome you to our
            community.
          </p>
        </div>

        {/* Application Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Icon className="h-6 w-6 text-primary-600" />
                <span>Your Application</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{config.description}</p>

              {applicationData && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Applicant:</span>
                    <span className="font-medium">
                      {applicationData.firstName} {applicationData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{applicationData.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">
                      {applicationData.currentCity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  {applicationData.heritage &&
                    applicationData.heritage.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Heritage:</span>
                        <span className="font-medium">
                          {applicationData.heritage.length} selected
                        </span>
                      </div>
                    )}
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  What happens next:
                </h4>
                <div className="space-y-3">
                  {config.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Membership Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Your Membership Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Once approved, you'll gain access to these exclusive benefits:
              </p>
              <div className="space-y-3">
                {config.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <ClockIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Review Timeline
              </h3>
              <p className="text-sm text-gray-600">
                2-3 business days for most applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <EnvelopeIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Email Updates
              </h3>
              <p className="text-sm text-gray-600">
                We'll email you with application status updates
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <PhoneIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Contact our membership team anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Community Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">
              Welcome to the Lusophone-Speaking Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                While you wait for approval, explore what makes our community
                special:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Global Lusophone Network
                  </h4>
                  <p className="text-sm text-gray-600">
                    Connect with Portuguese speakers from ALL backgrounds across
                    the UK
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">🎭</div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cultural Celebrations
                  </h4>
                  <p className="text-sm text-gray-600">
                    From Fado to Samba, Kizomba to Morna - all Portuguese
                    cultures celebrated
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Mutual Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    A community that helps each other thrive in the United
                    Kingdom
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-3 text-base"
              >
                Go to Dashboard
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/about")}
                className="px-8 py-3 text-base"
              >
                Learn More About Us
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Automatically redirecting to dashboard in {timeUntilRedirect}{" "}
              seconds...
            </p>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Obrigado/a! Thank You!
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your application represents another step in strengthening the
            Portuguese-speaking community across the United Kingdom. We look
            forward to welcoming you and celebrating our shared heritage
            together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MembershipSuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <MembershipSuccessPageInner />
    </Suspense>
  );
}
