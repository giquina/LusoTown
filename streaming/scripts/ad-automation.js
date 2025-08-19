/**
 * Ad Revenue Automation System
 * Cron jobs for aggregating stats and sending daily reports
 */

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Portuguese cultural context mapping
const CULTURAL_CONTEXTS = {
  portugal: { flag: '🇵🇹', name: 'Portugal' },
  brazil: { flag: '🇧🇷', name: 'Brasil' },
  uk_portuguese: { flag: '🇬🇧', name: 'UK Portuguese' },
  diaspora: { flag: '🌍', name: 'Portuguese Diaspora' },
  lusophone_africa: { flag: '🌍', name: 'Lusophone Africa' },
  international: { flag: '🌐', name: 'International' }
};

/**
 * Aggregate daily ad revenue data
 * Runs every hour to keep data fresh
 */
async function aggregateDailyRevenue() {
  try {
    console.log('🔄 Starting daily revenue aggregation...');
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Get impressions data for aggregation
    const { data: impressions, error: impressionsError } = await supabase
      .from('ad_impressions')
      .select(`
        campaign_id,
        network_id,
        country_code,
        cultural_context,
        device_type,
        revenue_amount,
        cpm_rate,
        impression_time,
        was_clicked
      `)
      .gte('impression_time', `${yesterday}T00:00:00Z`)
      .lt('impression_time', `${today}T23:59:59Z`);

    if (impressionsError) throw impressionsError;

    // Get clicks data
    const { data: clicks, error: clicksError } = await supabase
      .from('ad_clicks')
      .select(`
        campaign_id,
        network_id,
        country_code,
        cultural_context,
        revenue_amount,
        click_time
      `)
      .gte('click_time', `${yesterday}T00:00:00Z`)
      .lt('click_time', `${today}T23:59:59Z`);

    if (clicksError) throw clicksError;

    // Group data by date, network, and campaign
    const aggregatedData = {};

    impressions.forEach(impression => {
      const date = impression.impression_time.split('T')[0];
      const key = `${date}-${impression.network_id}-${impression.campaign_id}`;
      
      if (!aggregatedData[key]) {
        aggregatedData[key] = {
          date,
          network_id: impression.network_id,
          campaign_id: impression.campaign_id,
          total_impressions: 0,
          total_clicks: 0,
          total_revenue: 0,
          portugal_impressions: 0,
          brazil_impressions: 0,
          uk_impressions: 0,
          other_impressions: 0,
          portugal_revenue: 0,
          brazil_revenue: 0,
          uk_revenue: 0,
          other_revenue: 0,
          desktop_impressions: 0,
          mobile_impressions: 0,
          tablet_impressions: 0,
          diaspora_impressions: 0,
          native_portuguese_impressions: 0,
          average_cpm: 0,
          click_through_rate: 0
        };
      }

      const data = aggregatedData[key];
      data.total_impressions++;
      data.total_revenue += parseFloat(impression.revenue_amount || 0);

      // Geographic breakdown
      if (impression.country_code === 'PT') {
        data.portugal_impressions++;
        data.portugal_revenue += parseFloat(impression.revenue_amount || 0);
      } else if (impression.country_code === 'BR') {
        data.brazil_impressions++;
        data.brazil_revenue += parseFloat(impression.revenue_amount || 0);
      } else if (impression.country_code === 'GB') {
        data.uk_impressions++;
        data.uk_revenue += parseFloat(impression.revenue_amount || 0);
      } else {
        data.other_impressions++;
        data.other_revenue += parseFloat(impression.revenue_amount || 0);
      }

      // Device breakdown
      if (impression.device_type === 'desktop') {
        data.desktop_impressions++;
      } else if (impression.device_type === 'mobile') {
        data.mobile_impressions++;
      } else if (impression.device_type === 'tablet') {
        data.tablet_impressions++;
      }

      // Cultural context breakdown
      if (impression.cultural_context === 'diaspora') {
        data.diaspora_impressions++;
      } else if (['portugal', 'brazil'].includes(impression.cultural_context)) {
        data.native_portuguese_impressions++;
      }
    });

    // Add click data
    clicks.forEach(click => {
      const date = click.click_time.split('T')[0];
      const key = `${date}-${click.network_id}-${click.campaign_id}`;
      
      if (aggregatedData[key]) {
        aggregatedData[key].total_clicks++;
        aggregatedData[key].total_revenue += parseFloat(click.revenue_amount || 0);

        // Add to geographic revenue
        if (click.country_code === 'PT') {
          aggregatedData[key].portugal_revenue += parseFloat(click.revenue_amount || 0);
        } else if (click.country_code === 'BR') {
          aggregatedData[key].brazil_revenue += parseFloat(click.revenue_amount || 0);
        } else if (click.country_code === 'GB') {
          aggregatedData[key].uk_revenue += parseFloat(click.revenue_amount || 0);
        } else {
          aggregatedData[key].other_revenue += parseFloat(click.revenue_amount || 0);
        }
      }
    });

    // Calculate derived metrics and upsert data
    for (const data of Object.values(aggregatedData)) {
      data.average_cpm = data.total_impressions > 0 
        ? (data.total_revenue / data.total_impressions * 1000) 
        : 0;
      data.click_through_rate = data.total_impressions > 0 
        ? (data.total_clicks / data.total_impressions) 
        : 0;

      // Upsert to database
      const { error: upsertError } = await supabase
        .from('ad_revenue_daily')
        .upsert([data], { 
          onConflict: 'date,network_id,campaign_id' 
        });

      if (upsertError) {
        console.error('Error upserting daily data:', upsertError);
      }
    }

    console.log(`✅ Aggregated data for ${Object.keys(aggregatedData).length} network/campaign combinations`);
    
    // Update campaign current stats
    await updateCampaignStats();
    
  } catch (error) {
    console.error('❌ Error in daily revenue aggregation:', error);
  }
}

/**
 * Update current campaign statistics
 */
async function updateCampaignStats() {
  try {
    // Get current stats for all campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from('ad_campaigns')
      .select('id');

    if (campaignsError) throw campaignsError;

    for (const campaign of campaigns) {
      // Get impression count
      const { count: impressionCount, error: impressionError } = await supabase
        .from('ad_impressions')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', campaign.id);

      // Get click count
      const { count: clickCount, error: clickError } = await supabase
        .from('ad_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', campaign.id);

      // Get total revenue
      const { data: revenue, error: revenueError } = await supabase
        .from('ad_impressions')
        .select('revenue_amount')
        .eq('campaign_id', campaign.id);

      const { data: clickRevenue, error: clickRevenueError } = await supabase
        .from('ad_clicks')
        .select('revenue_amount')
        .eq('campaign_id', campaign.id);

      const totalRevenue = (revenue || []).reduce((sum, r) => sum + parseFloat(r.revenue_amount || 0), 0) +
                          (clickRevenue || []).reduce((sum, r) => sum + parseFloat(r.revenue_amount || 0), 0);

      // Update campaign
      const { error: updateError } = await supabase
        .from('ad_campaigns')
        .update({
          current_impressions: impressionCount || 0,
          current_clicks: clickCount || 0,
          current_spend: totalRevenue
        })
        .eq('id', campaign.id);

      if (updateError) {
        console.error(`Error updating campaign ${campaign.id}:`, updateError);
      }
    }

    console.log('✅ Updated campaign statistics');
  } catch (error) {
    console.error('❌ Error updating campaign stats:', error);
  }
}

/**
 * Generate and send daily revenue report
 */
async function sendDailyReport() {
  try {
    console.log('📧 Generating daily revenue report...');
    
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Get yesterday's aggregated data
    const { data: dailyData, error: dailyError } = await supabase
      .from('ad_revenue_daily')
      .select(`
        *,
        ad_networks(name, type),
        ad_campaigns(name, campaign_type)
      `)
      .eq('date', yesterdayStr)
      .order('total_revenue', { ascending: false });

    if (dailyError) throw dailyError;

    // Calculate totals
    const totals = dailyData.reduce((acc, item) => ({
      impressions: acc.impressions + item.total_impressions,
      clicks: acc.clicks + item.total_clicks,
      revenue: acc.revenue + item.total_revenue,
      portugalRevenue: acc.portugalRevenue + item.portugal_revenue,
      brazilRevenue: acc.brazilRevenue + item.brazil_revenue,
      ukRevenue: acc.ukRevenue + item.uk_revenue
    }), { impressions: 0, clicks: 0, revenue: 0, portugalRevenue: 0, brazilRevenue: 0, ukRevenue: 0 });

    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0;
    const avgCpm = totals.impressions > 0 ? (totals.revenue / totals.impressions * 1000) : 0;

    // Get Portuguese community performance
    const { data: portugueseData, error: portugueseError } = await supabase
      .rpc('get_portuguese_ad_performance', {
        start_date: yesterdayStr,
        end_date: yesterdayStr
      });

    if (portugueseError) throw portugueseError;

    // Generate HTML report
    const htmlReport = generateHtmlReport({
      date: yesterday.toLocaleDateString('pt-PT'),
      totals,
      ctr,
      avgCpm,
      dailyData,
      portugueseData
    });

    // Send email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lusotown.com';
    
    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: `🇵🇹 LusoTown Daily Revenue Report - ${yesterday.toLocaleDateString('pt-PT')}`,
      html: htmlReport
    });

    console.log(`✅ Daily report sent to ${adminEmail}`);
    
  } catch (error) {
    console.error('❌ Error sending daily report:', error);
  }
}

/**
 * Generate HTML report template
 */
function generateHtmlReport({ date, totals, ctr, avgCpm, dailyData, portugueseData }) {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>LusoTown Daily Revenue Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
        .stat-label { color: #64748b; font-size: 14px; }
        .section { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #1e293b; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; }
        th { background: #f1f5f9; font-weight: 600; }
        .cultural-flag { font-size: 20px; margin-right: 8px; }
        .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🇵🇹 LusoTown Daily Revenue Report</h1>
        <p>Portuguese Community Ad Monetization | ${date}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${formatCurrency(totals.revenue)}</div>
          <div class="stat-label">Total Revenue</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totals.impressions.toLocaleString()}</div>
          <div class="stat-label">Impressions</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${totals.clicks.toLocaleString()}</div>
          <div class="stat-label">Clicks</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${ctr.toFixed(2)}%</div>
          <div class="stat-label">Click-Through Rate</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🌍 Portuguese Community Performance</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">🇵🇹 ${formatCurrency(totals.portugalRevenue)}</div>
            <div class="stat-label">Portugal Revenue</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🇧🇷 ${formatCurrency(totals.brazilRevenue)}</div>
            <div class="stat-label">Brazil Revenue</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🇬🇧 ${formatCurrency(totals.ukRevenue)}</div>
            <div class="stat-label">UK Portuguese Revenue</div>
          </div>
        </div>

        ${portugueseData.length > 0 ? `
          <table>
            <thead>
              <tr>
                <th>Cultural Context</th>
                <th>Impressions</th>
                <th>Revenue</th>
                <th>Avg CPM</th>
              </tr>
            </thead>
            <tbody>
              ${portugueseData.map(item => `
                <tr>
                  <td>
                    <span class="cultural-flag">${CULTURAL_CONTEXTS[item.cultural_context]?.flag || '🌐'}</span>
                    ${CULTURAL_CONTEXTS[item.cultural_context]?.name || item.cultural_context}
                  </td>
                  <td>${item.impressions.toLocaleString()}</td>
                  <td>${formatCurrency(item.revenue)}</td>
                  <td>${formatCurrency(item.avg_cpm)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p>No Portuguese community data available for this period.</p>'}
      </div>

      <div class="section">
        <div class="section-title">📊 Network Performance</div>
        ${dailyData.length > 0 ? `
          <table>
            <thead>
              <tr>
                <th>Network</th>
                <th>Campaign</th>
                <th>Impressions</th>
                <th>Clicks</th>
                <th>CTR</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${dailyData.slice(0, 10).map(item => `
                <tr>
                  <td>${item.ad_networks?.name || 'Unknown'}</td>
                  <td>${item.ad_campaigns?.name || 'Unknown'}</td>
                  <td>${item.total_impressions.toLocaleString()}</td>
                  <td>${item.total_clicks.toLocaleString()}</td>
                  <td>${(item.click_through_rate * 100).toFixed(2)}%</td>
                  <td>${formatCurrency(item.total_revenue)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p>No network performance data available for this period.</p>'}
      </div>

      <div class="footer">
        <p>
          This report was automatically generated by the LusoTown Ad Revenue System.<br>
          For questions or support, contact the development team.
        </p>
        <p>
          <strong>LusoTown:</strong> Connecting Portuguese speakers in London & UK<br>
          🌐 Building the largest Portuguese community platform
        </p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Weekly performance summary
 */
async function sendWeeklyReport() {
  try {
    console.log('📈 Generating weekly performance summary...');
    
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get week's data
    const { data: weeklyData, error } = await supabase
      .from('ad_revenue_daily')
      .select(`
        *,
        ad_networks(name, type),
        ad_campaigns(name, campaign_type)
      `)
      .gte('date', weekAgo.toISOString().split('T')[0])
      .lte('date', today.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;

    // Calculate weekly totals and trends
    const weeklyTotals = weeklyData.reduce((acc, day) => ({
      revenue: acc.revenue + day.total_revenue,
      impressions: acc.impressions + day.total_impressions,
      clicks: acc.clicks + day.total_clicks
    }), { revenue: 0, impressions: 0, clicks: 0 });

    // Send weekly summary (simplified version)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lusotown.com';
    
    const weeklyHtml = `
      <h2>🇵🇹 LusoTown Weekly Summary</h2>
      <p><strong>Period:</strong> ${weekAgo.toLocaleDateString()} - ${today.toLocaleDateString()}</p>
      <ul>
        <li><strong>Total Revenue:</strong> ${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(weeklyTotals.revenue)}</li>
        <li><strong>Total Impressions:</strong> ${weeklyTotals.impressions.toLocaleString()}</li>
        <li><strong>Total Clicks:</strong> ${weeklyTotals.clicks.toLocaleString()}</li>
        <li><strong>Average CTR:</strong> ${weeklyTotals.impressions > 0 ? (weeklyTotals.clicks / weeklyTotals.impressions * 100).toFixed(2) : 0}%</li>
      </ul>
      <p>Check the admin dashboard for detailed analytics.</p>
    `;

    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: `🇵🇹 LusoTown Weekly Revenue Summary`,
      html: weeklyHtml
    });

    console.log('✅ Weekly report sent');
    
  } catch (error) {
    console.error('❌ Error sending weekly report:', error);
  }
}

/**
 * Setup cron jobs
 */
function setupCronJobs() {
  console.log('⏰ Setting up ad revenue automation cron jobs...');

  // Aggregate revenue data every hour
  cron.schedule('0 * * * *', () => {
    console.log('🔄 Running hourly revenue aggregation...');
    aggregateDailyRevenue();
  });

  // Send daily report at 8 AM
  cron.schedule('0 8 * * *', () => {
    console.log('📧 Sending daily revenue report...');
    sendDailyReport();
  });

  // Send weekly report on Mondays at 9 AM
  cron.schedule('0 9 * * 1', () => {
    console.log('📈 Sending weekly revenue summary...');
    sendWeeklyReport();
  });

  // Clean up old data monthly (keep last 6 months)
  cron.schedule('0 2 1 * *', async () => {
    console.log('🧹 Cleaning up old ad data...');
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    try {
      // Clean old impressions
      await supabase
        .from('ad_impressions')
        .delete()
        .lt('impression_time', sixMonthsAgo.toISOString());

      // Clean old daily aggregates
      await supabase
        .from('ad_revenue_daily')
        .delete()
        .lt('date', sixMonthsAgo.toISOString().split('T')[0]);

      console.log('✅ Old ad data cleaned up');
    } catch (error) {
      console.error('❌ Error cleaning up old data:', error);
    }
  });

  console.log('✅ Ad revenue automation cron jobs configured');
  console.log('📅 Schedule:');
  console.log('  - Revenue aggregation: Every hour');
  console.log('  - Daily reports: 8:00 AM daily');
  console.log('  - Weekly reports: 9:00 AM Mondays');
  console.log('  - Data cleanup: 2:00 AM 1st of month');
}

module.exports = {
  setupCronJobs,
  aggregateDailyRevenue,
  sendDailyReport,
  sendWeeklyReport,
  updateCampaignStats
};

// If this file is run directly, setup cron jobs
if (require.main === module) {
  setupCronJobs();
  
  // Keep the process running
  console.log('🚀 Ad revenue automation system started');
  console.log('Press Ctrl+C to stop');
}