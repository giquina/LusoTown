/**
 * LusoTown Ad Revenue API
 * Handles ad serving, impression tracking, and revenue analytics
 * Integrated with Portuguese cultural targeting
 */

const express = require('express');
const geoip = require('geoip-lite');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Ad network configurations
const AD_NETWORKS = {
  google_adsense: {
    name: 'Google AdSense',
    testMode: process.env.NODE_ENV !== 'production',
    publisherId: process.env.GOOGLE_ADSENSE_PUBLISHER_ID,
    baseUrl: 'https://pagead2.googlesyndication.com'
  },
  ezoic: {
    name: 'Ezoic',
    testMode: process.env.NODE_ENV !== 'production',
    siteId: process.env.EZOIC_SITE_ID,
    baseUrl: 'https://www.ezojs.com'
  },
  propeller: {
    name: 'Propeller Ads',
    testMode: process.env.NODE_ENV !== 'production',
    zoneId: process.env.PROPELLER_ZONE_ID,
    baseUrl: 'https://ads.propellerads.com'
  }
};

// Portuguese cultural context detection
function detectCulturalContext(country, language, userAgent) {
  const lowerUA = userAgent?.toLowerCase() || '';
  
  // Detect Portuguese cultural context
  if (country === 'PT') return 'portugal';
  if (country === 'BR') return 'brazil';
  if (country === 'GB' && language === 'pt') return 'uk_portuguese';
  if (['AO', 'MZ', 'CV', 'GW', 'ST', 'TL', 'MO'].includes(country)) return 'lusophone_africa';
  if (language === 'pt') return 'diaspora';
  
  return 'international';
}

// Get client IP address
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         '127.0.0.1';
}

// Geographic and device detection
function analyzeRequest(req) {
  const ip = getClientIP(req);
  const geo = geoip.lookup(ip) || {};
  const userAgent = req.headers['user-agent'] || '';
  const language = req.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'en';
  
  // Device detection
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    deviceType = /iPad/i.test(userAgent) ? 'tablet' : 'mobile';
  }
  
  return {
    ip,
    country: geo.country || 'US',
    region: geo.region || '',
    city: geo.city || '',
    deviceType,
    userAgent,
    language,
    culturalContext: detectCulturalContext(geo.country, language, userAgent)
  };
}

/**
 * GET /api/ads/config
 * Get ad network configuration for frontend
 */
router.get('/config', async (req, res) => {
  try {
    const { data: networks, error } = await supabase
      .from('ad_networks')
      .select('name, type, status, priority')
      .eq('status', 'active')
      .order('priority', { ascending: true });

    if (error) throw error;

    // Return safe configuration without sensitive keys
    const config = networks.map(network => {
      const networkConfig = AD_NETWORKS[network.type] || {};
      return {
        name: network.name,
        type: network.type,
        priority: network.priority,
        available: !!networkConfig.publisherId || !!networkConfig.siteId || !!networkConfig.zoneId || network.type === 'lusotown_promo'
      };
    });

    res.json({
      success: true,
      networks: config,
      testMode: process.env.NODE_ENV !== 'production'
    });
  } catch (error) {
    console.error('Error fetching ad config:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/ads/serve
 * Serve an ad based on context and targeting
 */
router.post('/serve', async (req, res) => {
  try {
    const { position, contentType, contentId, streamId } = req.body;
    const requestInfo = analyzeRequest(req);
    
    // Get available campaigns for this context
    const { data: campaigns, error: campaignError } = await supabase
      .from('ad_campaigns')
      .select(`
        *,
        ad_networks!inner(name, type, status, priority)
      `)
      .eq('status', 'active')
      .eq('ad_networks.status', 'active')
      .lte('start_date', new Date().toISOString())
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .contains('target_countries', [requestInfo.country])
      .order('ad_networks.priority', { ascending: true });

    if (campaignError) throw campaignError;

    // Filter campaigns by position and audience
    const eligibleCampaigns = campaigns.filter(campaign => {
      const matchesPosition = campaign.campaign_type.includes(position) || 
                             campaign.campaign_type === 'display_banner';
      const matchesAudience = campaign.target_audience === 'all' ||
                             campaign.target_audience === 'portuguese_speakers' && 
                             ['portugal', 'brazil', 'uk_portuguese', 'diaspora'].includes(requestInfo.culturalContext);
      return matchesPosition && matchesAudience;
    });

    let selectedCampaign = null;
    let adContent = null;

    if (eligibleCampaigns.length > 0) {
      // Select campaign based on priority and performance
      selectedCampaign = eligibleCampaigns[0];
      
      // Generate ad content based on campaign type
      if (selectedCampaign.ad_networks.type === 'lusotown_promo') {
        adContent = {
          type: 'lusotown_promo',
          title: requestInfo.language === 'pt' ? selectedCampaign.title_pt : selectedCampaign.title_en,
          description: requestInfo.language === 'pt' ? selectedCampaign.description_pt : selectedCampaign.description_en,
          imageUrl: selectedCampaign.creative_url || '/images/ads/lusotown-promo-default.jpg',
          clickUrl: selectedCampaign.click_url || '/premium-membership',
          duration: 15
        };
      } else {
        // Third-party ad network
        adContent = {
          type: selectedCampaign.ad_networks.type,
          networkName: selectedCampaign.ad_networks.name,
          publisherId: AD_NETWORKS[selectedCampaign.ad_networks.type]?.publisherId,
          slotId: `lusotown-${position}-${Date.now()}`,
          position,
          testMode: process.env.NODE_ENV !== 'production'
        };
      }
    } else {
      // Fallback to LusoTown promotional content
      const { data: fallbackCampaign } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('campaign_type', 'lusotown_promo')
        .eq('status', 'active')
        .limit(1)
        .single();

      if (fallbackCampaign) {
        selectedCampaign = fallbackCampaign;
        adContent = {
          type: 'lusotown_promo',
          title: requestInfo.language === 'pt' ? fallbackCampaign.title_pt : fallbackCampaign.title_en,
          description: requestInfo.language === 'pt' ? fallbackCampaign.description_pt : fallbackCampaign.description_en,
          imageUrl: '/images/ads/lusotown-default.jpg',
          clickUrl: '/premium-membership',
          duration: 10
        };
      }
    }

    // Track impression if we have a campaign
    if (selectedCampaign && adContent) {
      const impressionData = {
        campaign_id: selectedCampaign.id,
        network_id: selectedCampaign.network_id,
        user_id: req.user?.id || null,
        stream_id: streamId || null,
        page_url: req.headers.referer || req.headers.origin,
        ad_position: position,
        country_code: requestInfo.country,
        region: requestInfo.region,
        city: requestInfo.city,
        device_type: requestInfo.deviceType,
        user_agent: requestInfo.userAgent,
        ip_address: requestInfo.ip,
        cultural_context: requestInfo.culturalContext,
        language_preference: requestInfo.language,
        cpm_rate: 0.50, // Default CPM, should be updated from actual network
        revenue_amount: 0.0005, // $0.50 CPM = $0.0005 per impression
        currency: 'GBP'
      };

      const { error: impressionError } = await supabase
        .from('ad_impressions')
        .insert([impressionData]);

      if (impressionError) {
        console.error('Error tracking impression:', impressionError);
      }
    }

    res.json({
      success: true,
      ad: adContent,
      campaign: selectedCampaign ? {
        id: selectedCampaign.id,
        name: selectedCampaign.name,
        type: selectedCampaign.campaign_type
      } : null,
      context: {
        culturalContext: requestInfo.culturalContext,
        country: requestInfo.country,
        language: requestInfo.language,
        device: requestInfo.deviceType
      }
    });

  } catch (error) {
    console.error('Error serving ad:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/ads/impression
 * Track ad impression with detailed metrics
 */
router.post('/impression', async (req, res) => {
  try {
    const {
      campaignId,
      networkId,
      position,
      streamId,
      viewDuration = 0,
      wasCompleted = false
    } = req.body;

    const requestInfo = analyzeRequest(req);

    const impressionData = {
      campaign_id: campaignId,
      network_id: networkId,
      user_id: req.user?.id || null,
      stream_id: streamId || null,
      page_url: req.headers.referer,
      ad_position: position,
      country_code: requestInfo.country,
      region: requestInfo.region,
      city: requestInfo.city,
      device_type: requestInfo.deviceType,
      user_agent: requestInfo.userAgent,
      ip_address: requestInfo.ip,
      view_duration_seconds: viewDuration,
      was_completed: wasCompleted,
      cultural_context: requestInfo.culturalContext,
      language_preference: requestInfo.language,
      cpm_rate: 0.50,
      revenue_amount: 0.0005,
      currency: 'GBP'
    };

    const { data, error } = await supabase
      .from('ad_impressions')
      .insert([impressionData])
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      impressionId: data.id,
      revenue: data.revenue_amount
    });

  } catch (error) {
    console.error('Error tracking impression:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/ads/click
 * Track ad click and calculate revenue
 */
router.post('/click', async (req, res) => {
  try {
    const {
      impressionId,
      campaignId,
      networkId,
      clickUrl
    } = req.body;

    const requestInfo = analyzeRequest(req);

    const clickData = {
      impression_id: impressionId,
      campaign_id: campaignId,
      network_id: networkId,
      user_id: req.user?.id || null,
      click_url: clickUrl,
      country_code: requestInfo.country,
      cultural_context: requestInfo.culturalContext,
      cpc_rate: 0.25, // Default CPC
      revenue_amount: 0.25,
      currency: 'GBP'
    };

    const { data, error } = await supabase
      .from('ad_clicks')
      .insert([clickData])
      .select()
      .single();

    if (error) throw error;

    // Update impression as clicked
    await supabase
      .from('ad_impressions')
      .update({ was_clicked: true })
      .eq('id', impressionId);

    res.json({
      success: true,
      clickId: data.id,
      revenue: data.revenue_amount
    });

  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/ads/stats/revenue
 * Get revenue statistics for admin dashboard
 */
router.get('/stats/revenue', async (req, res) => {
  try {
    const { period = 'today', startDate, endDate } = req.query;
    
    let dateFilter = '';
    const now = new Date();
    
    switch (period) {
      case 'today':
        dateFilter = `DATE(impression_time) = '${now.toISOString().split('T')[0]}'`;
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = `impression_time >= '${weekAgo.toISOString()}'`;
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        dateFilter = `impression_time >= '${monthAgo.toISOString()}'`;
        break;
      case 'custom':
        if (startDate && endDate) {
          dateFilter = `DATE(impression_time) BETWEEN '${startDate}' AND '${endDate}'`;
        }
        break;
    }

    // Get revenue statistics
    const { data: revenueStats, error } = await supabase
      .rpc('calculate_daily_ad_revenue', {
        target_date: period === 'today' ? now.toISOString().split('T')[0] : null
      });

    if (error) throw error;

    // Get Portuguese community performance
    const { data: portugueseStats, error: portugueseError } = await supabase
      .rpc('get_portuguese_ad_performance', {
        start_date: startDate || now.toISOString().split('T')[0],
        end_date: endDate || now.toISOString().split('T')[0]
      });

    if (portugueseError) throw portugueseError;

    // Get daily aggregated data
    const { data: dailyData, error: dailyError } = await supabase
      .from('ad_revenue_daily')
      .select('*')
      .gte('date', startDate || now.toISOString().split('T')[0])
      .lte('date', endDate || now.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (dailyError) throw dailyError;

    // Calculate totals
    const totalRevenue = revenueStats.reduce((sum, stat) => sum + parseFloat(stat.total_revenue || 0), 0);
    const totalImpressions = revenueStats.reduce((sum, stat) => sum + parseInt(stat.total_impressions || 0), 0);
    const totalClicks = revenueStats.reduce((sum, stat) => sum + parseInt(stat.total_clicks || 0), 0);
    const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

    res.json({
      success: true,
      period,
      totals: {
        revenue: totalRevenue.toFixed(2),
        impressions: totalImpressions,
        clicks: totalClicks,
        ctr: averageCTR.toFixed(4),
        cpm: totalImpressions > 0 ? (totalRevenue / totalImpressions * 1000).toFixed(2) : 0
      },
      networkPerformance: revenueStats,
      portuguesePerformance: portugueseStats,
      dailyData: dailyData,
      currency: 'GBP'
    });

  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/ads/stats/campaigns
 * Get campaign performance statistics
 */
router.get('/stats/campaigns', async (req, res) => {
  try {
    const { data: campaigns, error } = await supabase
      .from('ad_campaigns')
      .select(`
        id,
        name,
        campaign_type,
        status,
        current_impressions,
        current_clicks,
        current_spend,
        daily_budget,
        total_budget,
        target_audience,
        start_date,
        end_date,
        ad_networks(name, type)
      `)
      .order('current_spend', { ascending: false });

    if (error) throw error;

    // Calculate performance metrics for each campaign
    const campaignStats = campaigns.map(campaign => {
      const ctr = campaign.current_impressions > 0 
        ? (campaign.current_clicks / campaign.current_impressions * 100).toFixed(4)
        : 0;
      
      const cpm = campaign.current_impressions > 0
        ? (campaign.current_spend / campaign.current_impressions * 1000).toFixed(2)
        : 0;

      const cpc = campaign.current_clicks > 0
        ? (campaign.current_spend / campaign.current_clicks).toFixed(2)
        : 0;

      return {
        ...campaign,
        performance: {
          ctr: parseFloat(ctr),
          cpm: parseFloat(cpm),
          cpc: parseFloat(cpc)
        }
      };
    });

    res.json({
      success: true,
      campaigns: campaignStats
    });

  } catch (error) {
    console.error('Error fetching campaign stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;