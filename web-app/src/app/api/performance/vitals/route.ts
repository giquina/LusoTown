import { NextRequest, NextResponse } from 'next/server';

interface WebVitalReport {
  url: string;
  timestamp: number;
  userAgent: string;
  connectionType?: string;
  deviceMemory?: number;
  metrics: {
    fcp: number | null;
    lcp: number | null;
    cls: number | null;
    fid: number | null;
    inp: number | null;
    ttfb: number | null;
  };
  pageScore: number | null;
  isPortuguesePage: boolean;
  isMobile: boolean;
  language: string;
}

interface PerformanceSummary {
  totalReports: number;
  averageScore: number;
  mobileUsage: number;
  portuguesePageUsage: number;
  averageMetrics: {
    fcp: number;
    lcp: number;
    cls: number;
    inp: number;
    ttfb: number;
  };
  recommendations: string[];
}

// In-memory storage for development (use proper database in production)
let performanceReports: WebVitalReport[] = [];
const MAX_REPORTS = 1000; // Keep last 1000 reports

export async function POST(request: NextRequest) {
  try {
    const report: WebVitalReport = await request.json();

    // Validate report structure
    if (!report.url || !report.timestamp || !report.metrics) {
      return NextResponse.json(
        { error: 'Invalid performance report format' },
        { status: 400 }
      );
    }

    // Add report to storage
    performanceReports.push({
      ...report,
      timestamp: Date.now(), // Use server timestamp
    });

    // Keep only recent reports
    if (performanceReports.length > MAX_REPORTS) {
      performanceReports = performanceReports.slice(-MAX_REPORTS);
    }

    // Log important performance issues
    logPerformanceIssues(report);

    console.log(`[Performance API] Received report from ${report.url}`, {
      score: report.pageScore,
      lcp: report.metrics.lcp,
      cls: report.metrics.cls,
      mobile: report.isMobile,
      portuguese: report.isPortuguesePage,
    });

    return NextResponse.json({ 
      success: true,
      reportId: performanceReports.length,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('[Performance API] Error processing report:', error);
    return NextResponse.json(
      { error: 'Failed to process performance report' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const summary = searchParams.get('summary') === 'true';
    const mobile = searchParams.get('mobile') === 'true';
    const portuguese = searchParams.get('portuguese') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    if (summary) {
      const summaryData = generatePerformanceSummary(mobile, portuguese);
      return NextResponse.json(summaryData);
    }

    // Filter reports based on parameters
    let filteredReports = performanceReports;

    if (mobile) {
      filteredReports = filteredReports.filter(report => report.isMobile);
    }

    if (portuguese) {
      filteredReports = filteredReports.filter(report => report.isPortuguesePage);
    }

    // Get recent reports
    const recentReports = filteredReports
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return NextResponse.json({
      reports: recentReports,
      total: filteredReports.length,
      summary: generatePerformanceSummary(mobile, portuguese),
    });

  } catch (error) {
    console.error('[Performance API] Error retrieving reports:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve performance reports' },
      { status: 500 }
    );
  }
}

function logPerformanceIssues(report: WebVitalReport): void {
  const issues: string[] = [];

  // Check LCP (Largest Contentful Paint)
  if (report.metrics.lcp && report.metrics.lcp > 4000) {
    issues.push(`Poor LCP: ${(report.metrics.lcp / 1000).toFixed(1)}s`);
  }

  // Check CLS (Cumulative Layout Shift)
  if (report.metrics.cls && report.metrics.cls > 0.25) {
    issues.push(`Poor CLS: ${report.metrics.cls.toFixed(3)}`);
  }

  // Check INP/FID (Interaction responsiveness)
  const interactionDelay = report.metrics.inp || report.metrics.fid;
  if (interactionDelay && interactionDelay > 500) {
    issues.push(`Poor Interaction: ${Math.round(interactionDelay)}ms`);
  }

  // Check TTFB (Time to First Byte)
  if (report.metrics.ttfb && report.metrics.ttfb > 1800) {
    issues.push(`Poor TTFB: ${(report.metrics.ttfb / 1000).toFixed(1)}s`);
  }

  // Log significant issues
  if (issues.length > 0) {
    console.warn(`[Performance Issues] ${report.url}:`, issues.join(', '), {
      mobile: report.isMobile,
      portuguese: report.isPortuguesePage,
      connection: report.connectionType,
      deviceMemory: report.deviceMemory,
    });
  }

  // Log mobile-specific Portuguese-speaking community issues
  if (report.isMobile && report.isPortuguesePage && report.pageScore && report.pageScore < 50) {
    console.error(`[Critical Portuguese Mobile Performance] ${report.url}`, {
      score: report.pageScore,
      metrics: report.metrics,
      userAgent: report.userAgent.substring(0, 100),
    });
  }
}

function generatePerformanceSummary(mobileOnly: boolean = false, portugueseOnly: boolean = false): PerformanceSummary {
  let filteredReports = performanceReports;

  if (mobileOnly) {
    filteredReports = filteredReports.filter(report => report.isMobile);
  }

  if (portugueseOnly) {
    filteredReports = filteredReports.filter(report => report.isPortuguesePage);
  }

  if (filteredReports.length === 0) {
    return {
      totalReports: 0,
      averageScore: 0,
      mobileUsage: 0,
      portuguesePageUsage: 0,
      averageMetrics: {
        fcp: 0,
        lcp: 0,
        cls: 0,
        inp: 0,
        ttfb: 0,
      },
      recommendations: [],
    };
  }

  // Calculate averages
  const validScores = filteredReports.filter(r => r.pageScore !== null).map(r => r.pageScore!);
  const averageScore = validScores.length > 0 ? validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;

  const mobileUsage = (filteredReports.filter(r => r.isMobile).length / filteredReports.length) * 100;
  const portuguesePageUsage = (filteredReports.filter(r => r.isPortuguesePage).length / filteredReports.length) * 100;

  // Calculate metric averages
  const calculateMetricAverage = (metricName: keyof WebVitalReport['metrics']): number => {
    const validValues = filteredReports
      .map(r => r.metrics[metricName])
      .filter(v => v !== null) as number[];
    
    return validValues.length > 0 ? validValues.reduce((a, b) => a + b, 0) / validValues.length : 0;
  };

  const averageMetrics = {
    fcp: calculateMetricAverage('fcp'),
    lcp: calculateMetricAverage('lcp'),
    cls: calculateMetricAverage('cls'),
    inp: calculateMetricAverage('inp'),
    ttfb: calculateMetricAverage('ttfb'),
  };

  // Generate recommendations
  const recommendations = generateRecommendations(averageMetrics, averageScore, mobileUsage, portuguesePageUsage);

  return {
    totalReports: filteredReports.length,
    averageScore,
    mobileUsage,
    portuguesePageUsage,
    averageMetrics,
    recommendations,
  };
}

function generateRecommendations(
  metrics: PerformanceSummary['averageMetrics'],
  score: number,
  mobileUsage: number,
  portugueseUsage: number
): string[] {
  const recommendations: string[] = [];

  // LCP recommendations
  if (metrics.lcp > 2500) {
    recommendations.push('Optimize Portuguese cultural images and above-the-fold content');
    recommendations.push('Implement better image compression for cultural galleries');
  }

  // CLS recommendations
  if (metrics.cls > 0.1) {
    recommendations.push('Stabilize layout for Portuguese event cards and community content');
    recommendations.push('Add dimensions to images and reserve space for dynamic content');
  }

  // INP/Interaction recommendations
  if (metrics.inp > 200) {
    recommendations.push('Optimize JavaScript execution for Portuguese community interactions');
    recommendations.push('Implement better lazy loading for cultural content');
  }

  // TTFB recommendations
  if (metrics.ttfb > 800) {
    recommendations.push('Optimize server response time for Portuguese content APIs');
    recommendations.push('Implement better caching strategies for cultural data');
  }

  // Mobile-specific recommendations
  if (mobileUsage > 70) {
    recommendations.push('Prioritize mobile optimization - majority of Portuguese users are on mobile');
    
    if (score < 70) {
      recommendations.push('Implement aggressive mobile performance optimizations');
      recommendations.push('Consider mobile-first Portuguese content loading strategies');
    }
  }

  // Portuguese-specific recommendations
  if (portugueseUsage > 50) {
    recommendations.push('Optimize Portuguese language content loading and rendering');
    recommendations.push('Implement better bundling for Portuguese cultural features');
  }

  // Overall score recommendations
  if (score < 50) {
    recommendations.push('Critical: Implement comprehensive performance optimization plan');
    recommendations.push('Consider professional performance audit for Portuguese-speaking community platform');
  } else if (score < 70) {
    recommendations.push('Implement targeted performance improvements');
    recommendations.push('Focus on Core Web Vitals optimization for Portuguese users');
  }

  return recommendations;
}

// Health check endpoint
export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      'X-Reports-Count': performanceReports.length.toString(),
      'X-Service-Status': 'healthy',
    },
  });
}