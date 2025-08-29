import { MonitoringDashboard } from '@/components/MonitoringDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monitoring Center | LusoTown - Portuguese Community Platform',
  description: 'Comprehensive monitoring and analytics for Portuguese-speaking community platform with real-time performance, security, and engagement metrics.',
  keywords: ['monitoring', 'analytics', 'portuguese community', 'platform metrics', 'performance', 'security'],
  openGraph: {
    title: 'Portuguese Community Platform Monitoring',
    description: 'Real-time monitoring of Portuguese-speaking community features, performance metrics, and cultural authenticity tracking.',
    type: 'website',
  },
};

/**
 * Monitoring Dashboard Page
 * 
 * Access point for comprehensive Portuguese community platform monitoring
 * including performance, security, community engagement, and mobile analytics.
 */
export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MonitoringDashboard />
    </div>
  );
}