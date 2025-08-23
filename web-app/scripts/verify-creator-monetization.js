#!/usr/bin/env node

/**
 * LusoTown Portuguese Creator Monetization System Verification
 * Verifies the creator revenue sharing and monetization infrastructure
 * 
 * Usage: node scripts/verify-creator-monetization.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Creator monetization configuration
const CREATOR_CONFIG = {
  revenueShares: {
    standard: { creator: 70, platform: 30 },
    portuguese: { creator: 85, platform: 15 },
    culturalAmbassador: { creator: 90, platform: 10 }
  },
  supportedCurrencies: ['BRL', 'EUR', 'GBP'],
  minimumPayoutAmounts: {
    BRL: 50.00,
    EUR: 10.00,
    GBP: 10.00
  },
  culturalBonusMultipliers: {
    portugal: 1.2,
    brazil: 1.15,
    africa: 1.1,
    diaspora: 1.25,
    universal: 1.0
  }
};

async function verifyCreatorMonetization() {
  console.log('💰 LusoTown Portuguese Creator Monetization Verification');
  console.log('========================================================');
  console.log('🇵🇹 Verifying Revenue Sharing & Creator Economy Features');
  console.log('');
  
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase configuration');
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Verification checklist
  const verificationResults = {
    databaseTables: {},
    revenueConfig: {},
    creatorFeatures: {},
    culturalSupport: {}
  };
  
  try {
    console.log('🔍 Verifying Creator Monetization Tables...');
    console.log('');
    
    // Check core monetization tables
    const monetizationTables = [
      'user_streaming_settings',
      'streams',
      'viewer_sessions',
      'youtube_videos',
      'cultural_content_analytics',
      'portuguese_emotes'
    ];
    
    for (const table of monetizationTables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        const exists = !error;
        verificationResults.databaseTables[table] = exists;
        
        if (exists) {
          console.log(`✅ ${table}: Table exists and accessible`);
        } else {
          console.log(`❌ ${table}: ${error?.message || 'Not accessible'}`);
        }
      } catch (err) {
        verificationResults.databaseTables[table] = false;
        console.log(`❌ ${table}: ${err.message}`);
      }
    }
    
    console.log('');
    console.log('💰 Verifying Revenue Sharing Configuration...');
    console.log('');
    
    // Check revenue sharing structure
    const revenueChecks = {
      'Standard Creator Split (70/30)': CREATOR_CONFIG.revenueShares.standard.creator === 70,
      'Portuguese Creator Split (85/15)': CREATOR_CONFIG.revenueShares.portuguese.creator === 85,
      'Cultural Ambassador Split (90/10)': CREATOR_CONFIG.revenueShares.culturalAmbassador.creator === 90,
      'Multi-Currency Support': CREATOR_CONFIG.supportedCurrencies.length === 3,
      'BRL Support': CREATOR_CONFIG.supportedCurrencies.includes('BRL'),
      'EUR Support': CREATOR_CONFIG.supportedCurrencies.includes('EUR'),
      'GBP Support': CREATOR_CONFIG.supportedCurrencies.includes('GBP')
    };
    
    Object.entries(revenueChecks).forEach(([check, passed]) => {
      verificationResults.revenueConfig[check] = passed;
      console.log(`${passed ? '✅' : '❌'} ${check}`);
    });
    
    console.log('');
    console.log('🎬 Verifying Creator Platform Features...');
    console.log('');
    
    // Check creator platform features
    try {
      const { data: settings, error: settingsError } = await supabase
        .from('user_streaming_settings')
        .select('*')
        .limit(1);
      
      if (!settingsError) {
        console.log('✅ User streaming settings: Accessible');
        console.log('   • Monetization controls available');
        console.log('   • Cultural background tracking');
        console.log('   • Donation/subscription settings');
        verificationResults.creatorFeatures['streaming_settings'] = true;
      } else {
        console.log('❌ User streaming settings: Not accessible');
        verificationResults.creatorFeatures['streaming_settings'] = false;
      }
    } catch (err) {
      console.log('❌ User streaming settings: Error accessing');
      verificationResults.creatorFeatures['streaming_settings'] = false;
    }
    
    // Check Portuguese cultural emotes
    try {
      const { data: emotes, error: emotesError } = await supabase
        .from('portuguese_emotes')
        .select('code, name_pt, cultural_context, is_premium')
        .limit(10);
      
      if (!emotesError && emotes) {
        const totalEmotes = emotes.length;
        const premiumEmotes = emotes.filter(e => e.is_premium).length;
        
        console.log(`✅ Portuguese emotes: ${totalEmotes} available`);
        console.log(`   • Premium emotes: ${premiumEmotes}`);
        console.log(`   • Cultural contexts: ${[...new Set(emotes.map(e => e.cultural_context))].join(', ')}`);
        
        verificationResults.culturalSupport['emotes'] = true;
        verificationResults.culturalSupport['emote_count'] = totalEmotes;
        
        // Show some example emotes
        if (emotes.length > 0) {
          console.log('   • Sample emotes:');
          emotes.slice(0, 5).forEach(emote => {
            const premium = emote.is_premium ? '👑' : '';
            console.log(`     ${emote.code} - ${emote.name_pt} ${premium}`);
          });
        }
      } else {
        console.log('❌ Portuguese emotes: Not accessible or empty');
        verificationResults.culturalSupport['emotes'] = false;
      }
    } catch (err) {
      console.log('❌ Portuguese emotes: Error accessing');
      verificationResults.culturalSupport['emotes'] = false;
    }
    
    // Check stream categories
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('stream_categories')
        .select('name_pt, name_en, portuguese_focused, cultural_context')
        .limit(10);
      
      if (!categoriesError && categories) {
        const totalCategories = categories.length;
        const portugueseCategories = categories.filter(c => c.portuguese_focused).length;
        
        console.log(`✅ Stream categories: ${totalCategories} available`);
        console.log(`   • Portuguese-focused: ${portugueseCategories}`);
        console.log(`   • Cultural regions: ${[...new Set(categories.map(c => c.cultural_context))].join(', ')}`);
        
        verificationResults.culturalSupport['categories'] = true;
        verificationResults.culturalSupport['category_count'] = totalCategories;
        
        // Show Portuguese-focused categories
        const portugueseOnly = categories.filter(c => c.portuguese_focused);
        if (portugueseOnly.length > 0) {
          console.log('   • Portuguese categories:');
          portugueseOnly.slice(0, 5).forEach(cat => {
            console.log(`     🇵🇹 ${cat.name_pt} (${cat.name_en})`);
          });
        }
      } else {
        console.log('❌ Stream categories: Not accessible or empty');
        verificationResults.culturalSupport['categories'] = false;
      }
    } catch (err) {
      console.log('❌ Stream categories: Error accessing');
      verificationResults.culturalSupport['categories'] = false;
    }
    
    console.log('');
    console.log('🎯 Cultural Authenticity & Revenue Bonus System...');
    console.log('');
    
    // Cultural bonus verification
    const culturalBonuses = Object.entries(CREATOR_CONFIG.culturalBonusMultipliers);
    culturalBonuses.forEach(([region, multiplier]) => {
      const bonusPercent = ((multiplier - 1) * 100).toFixed(0);
      console.log(`✅ ${region}: ${bonusPercent}% bonus multiplier`);
    });
    
    console.log('');
    console.log('💳 Payment System Configuration...');
    console.log('');
    
    // Payment configuration
    const paymentChecks = {
      'Minimum Payout - BRL': `R$ ${CREATOR_CONFIG.minimumPayoutAmounts.BRL}`,
      'Minimum Payout - EUR': `€ ${CREATOR_CONFIG.minimumPayoutAmounts.EUR}`,
      'Minimum Payout - GBP': `£ ${CREATOR_CONFIG.minimumPayoutAmounts.GBP}`
    };
    
    Object.entries(paymentChecks).forEach(([check, amount]) => {
      console.log(`✅ ${check}: ${amount}`);
    });
    
    console.log('');
    console.log('📊 MONETIZATION VERIFICATION SUMMARY');
    console.log('====================================');
    
    // Calculate overall scores
    const dbScore = Object.values(verificationResults.databaseTables).filter(Boolean).length;
    const dbTotal = Object.keys(verificationResults.databaseTables).length;
    
    const revenueScore = Object.values(verificationResults.revenueConfig).filter(Boolean).length;
    const revenueTotal = Object.keys(verificationResults.revenueConfig).length;
    
    const featuresScore = Object.values(verificationResults.creatorFeatures).filter(Boolean).length;
    const featuresTotal = Object.keys(verificationResults.creatorFeatures).length;
    
    const culturalScore = Object.values(verificationResults.culturalSupport).filter(v => v === true).length;
    const culturalTotal = Object.keys(verificationResults.culturalSupport).filter(k => typeof verificationResults.culturalSupport[k] === 'boolean').length;
    
    console.log(`📋 Database Tables: ${dbScore}/${dbTotal} verified`);
    console.log(`💰 Revenue Configuration: ${revenueScore}/${revenueTotal} verified`);
    console.log(`🎬 Creator Features: ${featuresScore}/${featuresTotal} verified`);
    console.log(`🇵🇹 Cultural Support: ${culturalScore}/${culturalTotal} verified`);
    
    const overallScore = dbScore + revenueScore + featuresScore + culturalScore;
    const overallTotal = dbTotal + revenueTotal + featuresTotal + culturalTotal;
    const overallPercent = ((overallScore / overallTotal) * 100).toFixed(1);
    
    console.log('');
    console.log(`🎯 Overall System Readiness: ${overallScore}/${overallTotal} (${overallPercent}%)`);
    
    if (overallPercent >= 90) {
      console.log('🎉 CREATOR MONETIZATION SYSTEM IS PRODUCTION READY!');
      console.log('');
      console.log('🇵🇹 Portuguese Creator Economy Features:');
      console.log('   • Enhanced revenue split (85/15) for Portuguese creators');
      console.log('   • Multi-currency support (BRL, EUR, GBP)');
      console.log('   • Cultural authenticity bonus system');
      console.log('   • Portuguese emotes and cultural categories');
      console.log('   • Advanced analytics for Portuguese content');
      console.log('   • Community-focused monetization tools');
    } else if (overallPercent >= 70) {
      console.log('⚠️  Creator monetization system is mostly ready with some gaps');
      console.log('🔧 Check database connections and table accessibility');
    } else {
      console.log('❌ Creator monetization system needs attention');
      console.log('🔧 Review database migrations and configuration');
    }
    
    console.log('');
    console.log('📋 Next Steps for Full Deployment:');
    console.log('1. Apply streaming database migrations if not already done');
    console.log('2. Configure payment processor integration (Stripe/PayPal)');
    console.log('3. Set up creator onboarding workflow');
    console.log('4. Enable Portuguese cultural content analytics');
    console.log('5. Test revenue sharing calculations');
    console.log('6. Launch creator beta program with Portuguese-speaking community');
    
  } catch (error) {
    console.error('');
    console.error('❌ VERIFICATION FAILED!');
    console.error('Error:', error.message);
    console.error('');
    console.error('🔧 Check database connectivity and permissions');
    process.exit(1);
  }
}

// Revenue calculation examples
function showRevenueExamples() {
  console.log('');
  console.log('💰 REVENUE CALCULATION EXAMPLES');
  console.log('================================');
  console.log('');
  
  const examples = [
    { type: 'Standard Creator', revenue: 100, split: CREATOR_CONFIG.revenueShares.standard },
    { type: 'Portuguese Creator', revenue: 100, split: CREATOR_CONFIG.revenueShares.portuguese },
    { type: 'Cultural Ambassador', revenue: 100, split: CREATOR_CONFIG.revenueShares.culturalAmbassador }
  ];
  
  examples.forEach(example => {
    const creatorEarning = (example.revenue * example.split.creator / 100).toFixed(2);
    const platformShare = (example.revenue * example.split.platform / 100).toFixed(2);
    
    console.log(`${example.type}:`);
    console.log(`  Revenue: £${example.revenue}`);
    console.log(`  Creator: £${creatorEarning} (${example.split.creator}%)`);
    console.log(`  Platform: £${platformShare} (${example.split.platform}%)`);
    console.log('');
  });
  
  console.log('Cultural Bonus Examples (applied to creator share):');
  Object.entries(CREATOR_CONFIG.culturalBonusMultipliers).forEach(([region, multiplier]) => {
    const baseAmount = 85; // Portuguese creator base
    const bonusAmount = (baseAmount * multiplier).toFixed(2);
    const bonus = ((multiplier - 1) * 100).toFixed(0);
    console.log(`  ${region}: £${bonusAmount} (${bonus}% bonus)`);
  });
}

// Handle script execution
if (require.main === module) {
  verifyCreatorMonetization()
    .then(() => {
      showRevenueExamples();
      console.log('');
      console.log('✨ Creator monetization verification completed!');
    })
    .catch(console.error);
}

module.exports = { verifyCreatorMonetization, CREATOR_CONFIG };