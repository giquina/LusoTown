#!/usr/bin/env node
/**
 * LusoTown Portuguese Community - Streamlabs Mobile Setup
 * Automatic configuration generator for Streamlabs mobile streaming
 */

const fs = require('fs');
const path = require('path');

// Get Codespaces URL from environment or detect automatically
const getCodespaceUrl = () => {
  const codespaceUrl = process.env.CODESPACE_NAME 
    ? `https://${process.env.CODESPACE_NAME}-{PORT}-${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`
    : 'https://localhost:{PORT}';
  
  return codespaceUrl;
};

// Portuguese community streaming configuration
const generateStreamlabsConfig = () => {
  const baseUrl = getCodespaceUrl();
  
  const config = {
    // Streamlabs mobile configuration
    streamlabs: {
      rtmpUrl: baseUrl.replace('{PORT}', '1935').replace('https://', 'rtmp://') + '/live/',
      streamKey: 'streamlabs_lusotown_2025',
      
      // Optimal settings for Portuguese content
      video: {
        resolution: '1280x720',  // 720p for mobile optimization
        framerate: 30,
        bitrate: 2500,           // 2.5 Mbps for stable quality
        encoder: 'x264',
        preset: 'veryfast',
        keyframeInterval: 2
      },
      
      audio: {
        bitrate: 128,            // 128 kbps for clear Portuguese audio
        sampleRate: 44100,
        channels: 2,             // Stereo for Portuguese music/cultural content
        encoder: 'AAC'
      },
      
      // Portuguese community specific settings
      advanced: {
        bufferSize: '2048KB',
        lowLatencyMode: true,
        portugueseOptimized: true,
        culturalContentMode: true
      }
    },
    
    // Viewing URLs for Portuguese community
    playback: {
      hlsUrl: baseUrl.replace('{PORT}', '8080') + '/live/streamlabs_lusotown_2025.m3u8',
      webPlayerUrl: baseUrl.replace('{PORT}', '3000') + '/live/streamlabs_lusotown_2025',
      apiUrl: baseUrl.replace('{PORT}', '3002') + '/api/v1/streams',
      statsUrl: baseUrl.replace('{PORT}', '1985') + '/api/v1/streams'
    },
    
    // Portuguese community features
    community: {
      emotes: [':saudade:', ':festa:', ':futebol:', ':fado:', ':portugal:', ':brasil:'],
      chatLanguages: ['pt', 'en'],
      culturalTags: ['portuguese', 'cultural', 'business', 'lusotown'],
      regions: ['portugal', 'brazil', 'angola', 'mozambique', 'diaspora']
    },
    
    // Mobile streaming recommendations
    mobile: {
      recommendedBandwidth: '5 Mbps upload minimum',
      networkType: 'WiFi preferred, 4G/5G acceptable',
      batteryOptimization: 'Use power saving mode for longer streams',
      storageRequirement: '1GB free space recommended'
    }
  };
  
  return config;
};

// Generate Portuguese community stream keys
const generateStreamKeys = () => {
  const keys = {
    // Main Portuguese community streams
    cultural: 'portuguese_cultural_' + Date.now(),
    business: 'portuguese_business_' + Date.now(),
    social: 'portuguese_social_' + Date.now(),
    
    // Test streams
    streamlabs_test: 'streamlabs_lusotown_2025',
    mobile_test: 'mobile_test_' + Date.now(),
    
    // Content categories
    fado: 'fado_session_' + Date.now(),
    cooking: 'portuguese_cooking_' + Date.now(),
    language: 'portuguese_lessons_' + Date.now(),
    sports: 'portuguese_sports_' + Date.now()
  };
  
  return keys;
};

// Create setup instructions for Portuguese community
const createSetupInstructions = (config, streamKeys) => {
  const baseUrl = getCodespaceUrl();
  
  return `
🇵🇹 LusoTown Portuguese Community - Streamlabs Mobile Setup
==========================================================

📱 STREAMLABS MOBILE CONFIGURATION:

1. Open Streamlabs Mobile App
2. Go to Settings > Stream Settings
3. Select "Custom RTMP"
4. Enter the following:

   📡 RTMP URL: ${config.streamlabs.rtmpUrl}
   🔑 Stream Key: ${config.streamlabs.streamKey}

📹 RECOMMENDED VIDEO SETTINGS:
   • Resolution: ${config.streamlabs.video.resolution} (720p)
   • Frame Rate: ${config.streamlabs.video.framerate} FPS
   • Bitrate: ${config.streamlabs.video.bitrate} kbps
   • Encoder: ${config.streamlabs.video.encoder}

🎵 RECOMMENDED AUDIO SETTINGS:
   • Bitrate: ${config.streamlabs.audio.bitrate} kbps
   • Sample Rate: ${config.streamlabs.audio.sampleRate} Hz
   • Channels: ${config.streamlabs.audio.channels} (Stereo)

🌐 VIEWING YOUR STREAM:
   📺 HLS Player: ${config.playback.hlsUrl}
   🖥️ Web Player: ${config.playback.webPlayerUrl}
   📊 Stream Stats: ${config.playback.statsUrl}

🇵🇹 PORTUGUESE COMMUNITY FEATURES:
   😊 Cultural Emotes: ${config.community.emotes.join(', ')}
   🗣️ Languages: ${config.community.chatLanguages.join(', ')}
   🏷️ Content Tags: ${config.community.culturalTags.join(', ')}

📱 MOBILE STREAMING TIPS:
   📶 Network: ${config.mobile.recommendedBandwidth}
   📱 Connection: ${config.mobile.networkType}
   🔋 Battery: ${config.mobile.batteryOptimization}
   💾 Storage: ${config.mobile.storageRequirement}

🔑 ADDITIONAL STREAM KEYS FOR PORTUGUESE CONTENT:
   🎭 Cultural Events: ${streamKeys.cultural}
   💼 Business Workshops: ${streamKeys.business}
   🎉 Social Gatherings: ${streamKeys.social}
   🎵 Fado Sessions: ${streamKeys.fado}
   🍽️ Cooking Shows: ${streamKeys.cooking}
   📚 Language Lessons: ${streamKeys.language}
   ⚽ Sports Commentary: ${streamKeys.sports}

🚀 QUICK START STEPS:
   1. Configure Streamlabs with settings above
   2. Start streaming with key: ${config.streamlabs.streamKey}
   3. View your stream at: ${config.playback.webPlayerUrl}
   4. Monitor stats at: ${config.playback.apiUrl}

✅ Ready to stream Portuguese cultural content to the London community!

📞 Support: Visit ${baseUrl.replace('{PORT}', '3000')}/help for Portuguese community assistance
`;
};

// Main execution
const main = () => {
  console.log('🇵🇹 Generating LusoTown Portuguese Community Streamlabs Configuration...\n');
  
  const config = generateStreamlabsConfig();
  const streamKeys = generateStreamKeys();
  const instructions = createSetupInstructions(config, streamKeys);
  
  // Save configuration files
  const configDir = './config';
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Save JSON configuration
  fs.writeFileSync(
    path.join(configDir, 'streamlabs-config.json'), 
    JSON.stringify(config, null, 2)
  );
  
  // Save stream keys
  fs.writeFileSync(
    path.join(configDir, 'stream-keys.json'), 
    JSON.stringify(streamKeys, null, 2)
  );
  
  // Save setup instructions
  fs.writeFileSync(
    path.join(configDir, 'STREAMLABS_SETUP.md'), 
    instructions
  );
  
  // Display configuration
  console.log(instructions);
  
  console.log('\n📁 Configuration files saved to ./config/');
  console.log('   • streamlabs-config.json - Complete configuration');
  console.log('   • stream-keys.json - Portuguese community stream keys');
  console.log('   • STREAMLABS_SETUP.md - Setup instructions');
  
  console.log('\n🚀 Start the streaming infrastructure with:');
  console.log('   docker-compose up -d');
  console.log('\n🇵🇹 LusoTown Portuguese Community streaming ready for Streamlabs mobile!');
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateStreamlabsConfig,
  generateStreamKeys,
  createSetupInstructions
};