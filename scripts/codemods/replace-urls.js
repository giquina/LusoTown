#!/usr/bin/env node

/**
 * LusoTown URL Replacement Codemod
 * 
 * Automatically finds and replaces literal URLs with config constants.
 * Handles http://, https://, rtmp://, ws:// protocols and replaces them
 * with ROUTES, STREAMING_URLS, or other config constants.
 * 
 * Usage:
 *   node scripts/codemods/replace-urls.js [--dry-run] [--path=src]
 * 
 * Features:
 * - Detects literal URLs in TypeScript/JavaScript files
 * - Replaces with appropriate config constants
 * - Updates imports to include config modules
 * - Creates backup files
 * - Handles streaming URLs, API endpoints, and route constants
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  sourceDir: './src',
  configDir: './src/config',
  backupDir: './backups/url-replacement',
  excludePatterns: [
    '*.test.tsx', '*.test.ts', '*.stories.tsx', '*.d.ts',
    'node_modules', '.next', 'dist', 'coverage'
  ]
};

// URL patterns to detect and replace
const URL_PATTERNS = {
  // HTTP/HTTPS URLs
  httpUrls: /(["'`])https?:\/\/[^"'`\s]+\1/g,
  
  // RTMP streaming URLs  
  rtmpUrls: /(["'`])rtmp:\/\/[^"'`\s]+\1/g,
  
  // WebSocket URLs
  wsUrls: /(["'`])wss?:\/\/[^"'`\s]+\1/g,
  
  // Route literals (starting with /)
  routeLiterals: /(["'`])\/[a-zA-Z][^"'`\s]*\1/g,
  
  // API endpoint literals
  apiEndpoints: /(["'`])\/api\/[^"'`\s]+\1/g
};

// Config import mapping
const CONFIG_IMPORTS = {
  routes: "import { ROUTES } from '@/config/routes';",
  streaming: "import { STREAMING_URLS } from '@/config/streaming';",
  api: "import { API_ENDPOINTS } from '@/config/api';",
  cdn: "import { CDN_URLS } from '@/config/cdn';"
};

// URL categorization and replacement logic
class URLReplacer {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.targetPath = options.path || CONFIG.sourceDir;
    this.replacements = new Map();
    this.backupCreated = false;
    this.configUpdates = new Set();
  }

  createBackup() {
    if (this.backupCreated || this.dryRun) return;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(CONFIG.backupDir, timestamp);
    
    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }
    
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }
    
    // Backup source files
    execSync(`cp -r ${CONFIG.sourceDir} ${backupPath}/`);
    
    console.log(`✅ Backup created: ${backupPath}`);
    this.backupCreated = true;
  }

  categorizeUrl(url) {
    // Remove quotes
    const cleanUrl = url.replace(/["'`]/g, '');
    
    // Streaming URLs
    if (cleanUrl.startsWith('rtmp://') || cleanUrl.includes('streaming') || cleanUrl.includes('.m3u8')) {
      return { type: 'streaming', constant: this.generateStreamingConstant(cleanUrl) };
    }
    
    // API endpoints
    if (cleanUrl.startsWith('/api/')) {
      return { type: 'api', constant: this.generateApiConstant(cleanUrl) };
    }
    
    // Routes
    if (cleanUrl.startsWith('/') && !cleanUrl.includes('http')) {
      return { type: 'routes', constant: this.generateRouteConstant(cleanUrl) };
    }
    
    // External URLs (CDN, social, etc.)
    if (cleanUrl.startsWith('http')) {
      return { type: 'cdn', constant: this.generateCdnConstant(cleanUrl) };
    }
    
    return null;
  }

  generateStreamingConstant(url) {
    if (url.includes('rtmp://')) return 'STREAMING_URLS.rtmpBase';
    if (url.includes('.m3u8')) return 'STREAMING_URLS.hlsPlayback';
    if (url.includes('streaming')) return 'STREAMING_URLS.serverUrl';
    return 'STREAMING_URLS.base';
  }

  generateApiConstant(url) {
    const path = url.replace('/api/', '');
    const segments = path.split('/');
    const endpoint = segments[0];
    
    switch (endpoint) {
      case 'auth': return 'API_ENDPOINTS.auth';
      case 'events': return 'API_ENDPOINTS.events';
      case 'users': return 'API_ENDPOINTS.users';
      case 'matches': return 'API_ENDPOINTS.matches';
      case 'business': return 'API_ENDPOINTS.business';
      case 'streaming': return 'API_ENDPOINTS.streaming';
      case 'transport': return 'API_ENDPOINTS.transport';
      case 'payments': return 'API_ENDPOINTS.payments';
      default: return 'API_ENDPOINTS.base';
    }
  }

  generateRouteConstant(url) {
    // Map common routes to ROUTES constants
    const routeMap = {
      '/': 'ROUTES.home',
      '/events': 'ROUTES.events',
      '/matches': 'ROUTES.matches',
      '/groups': 'ROUTES.groups',
      '/transport': 'ROUTES.transport',
      '/business-directory': 'ROUTES.businessDirectory',
      '/live': 'ROUTES.live',
      '/streaming': 'ROUTES.streaming',
      '/pricing': 'ROUTES.pricing',
      '/students': 'ROUTES.students',
      '/dashboard': 'ROUTES.dashboard',
      '/profile': 'ROUTES.profile',
      '/settings': 'ROUTES.settings',
      '/help': 'ROUTES.help',
      '/about': 'ROUTES.about',
      '/contact': 'ROUTES.contact'
    };
    
    return routeMap[url] || `ROUTES.${url.replace('/', '').replace('-', '')}`;
  }

  generateCdnConstant(url) {
    if (url.includes('cloudinary.com')) return 'CDN_URLS.cloudinary';
    if (url.includes('unsplash.com')) return 'CDN_URLS.unsplash';
    if (url.includes('images.unsplash.com')) return 'CDN_URLS.unsplashImages';
    if (url.includes('bunnycdn.com')) return 'CDN_URLS.bunny';
    if (url.includes('github.com')) return 'CDN_URLS.github';
    return 'CDN_URLS.external';
  }

  addRequiredImport(content, importType) {
    const importStatement = CONFIG_IMPORTS[importType];
    if (!importStatement || content.includes(importStatement)) {
      return content;
    }
    
    // Find the import section
    const importMatch = content.match(/^(import.*from ['"][^'"]*['"];?\s*)*/m);
    const importSection = importMatch ? importMatch[0] : '';
    
    // Add the new import
    return content.replace(importSection, importSection + importStatement + '\n');
  }

  processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const replacements = [];
    const relativePath = path.relative(process.cwd(), filePath);
    
    let modifiedContent = content;
    let hasReplacements = false;
    
    // Process each URL pattern
    Object.entries(URL_PATTERNS).forEach(([patternName, pattern]) => {
      let match;
      pattern.lastIndex = 0; // Reset regex
      
      while ((match = pattern.exec(content)) !== null) {
        const url = match[0];
        const categorization = this.categorizeUrl(url);
        
        if (categorization) {
          replacements.push({
            original: url,
            replacement: categorization.constant,
            type: categorization.type,
            pattern: patternName
          });
          
          // Replace in content
          modifiedContent = modifiedContent.replace(url, categorization.constant);
          hasReplacements = true;
          this.configUpdates.add(categorization.type);
        }
      }
    });
    
    // Add required imports
    if (hasReplacements) {
      this.configUpdates.forEach(importType => {
        modifiedContent = this.addRequiredImport(modifiedContent, importType);
      });
    }
    
    return { replacements, modifiedContent, hasReplacements };
  }

  processFiles() {
    const files = this.getFilesToProcess();
    let totalReplacements = 0;
    
    console.log(`🔍 Processing ${files.length} files...`);
    
    for (const filePath of files) {
      const { replacements, modifiedContent, hasReplacements } = this.processFile(filePath);
      
      if (hasReplacements) {
        console.log(`📝 ${path.relative(process.cwd(), filePath)}: ${replacements.length} replacements`);
        totalReplacements += replacements.length;
        
        // Store replacements
        replacements.forEach(replacement => {
          const key = `${replacement.original} -> ${replacement.replacement}`;
          this.replacements.set(key, replacement);
        });
        
        // Write modified file
        if (!this.dryRun) {
          this.createBackup();
          fs.writeFileSync(filePath, modifiedContent);
        }
      }
    }
    
    return totalReplacements;
  }

  updateConfigFiles() {
    if (this.dryRun) {
      console.log('\n🔍 Dry run - would update config files:');
      this.configUpdates.forEach(configType => {
        console.log(`  - ${configType} configuration`);
      });
      return;
    }
    
    // Update streaming config if needed
    if (this.configUpdates.has('streaming')) {
      this.ensureStreamingConfig();
    }
    
    // Update API endpoints if needed
    if (this.configUpdates.has('api')) {
      this.ensureApiConfig();
    }
    
    // Update CDN config if needed
    if (this.configUpdates.has('cdn')) {
      this.ensureCdnConfig();
    }
  }

  ensureStreamingConfig() {
    const streamingConfigPath = path.join(CONFIG.configDir, 'streaming.ts');
    
    if (!fs.existsSync(streamingConfigPath)) {
      const streamingConfig = `/**
 * Streaming URLs Configuration
 * Centralized streaming server URLs and endpoints
 */

export const STREAMING_URLS = {
  rtmpBase: process.env.NEXT_PUBLIC_RTMP_SERVER_URL || 'rtmp://localhost:1935',
  hlsPlayback: process.env.NEXT_PUBLIC_HLS_SERVER_URL || 'http://localhost:8080',
  serverUrl: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080',
  websocket: process.env.NEXT_PUBLIC_STREAMING_WS_URL || 'ws://localhost:8080',
  base: process.env.NEXT_PUBLIC_STREAMING_BASE_URL || 'http://localhost:8080'
} as const;

export const RTMP_CONFIG = {
  server: STREAMING_URLS.rtmpBase + '/live',
  playbackBase: STREAMING_URLS.hlsPlayback + '/live'
} as const;`;
      
      fs.writeFileSync(streamingConfigPath, streamingConfig);
      console.log(`✅ Created ${streamingConfigPath}`);
    }
  }

  ensureApiConfig() {
    const apiConfigPath = path.join(CONFIG.configDir, 'api.ts');
    
    if (!fs.existsSync(apiConfigPath)) {
      const apiConfig = `/**
 * API Endpoints Configuration
 * Centralized API endpoint constants
 */

export const API_ENDPOINTS = {
  base: '/api',
  auth: '/api/auth',
  events: '/api/events',
  users: '/api/users',
  matches: '/api/matches',
  business: '/api/business',
  streaming: '/api/streaming',
  transport: '/api/transport',
  payments: '/api/payments',
  webhooks: '/api/webhooks'
} as const;`;
      
      fs.writeFileSync(apiConfigPath, apiConfig);
      console.log(`✅ Created ${apiConfigPath}`);
    }
  }

  ensureCdnConfig() {
    const cdnConfigPath = path.join(CONFIG.configDir, 'cdn.ts');
    
    if (!fs.existsSync(cdnConfigPath)) {
      const cdnConfig = `/**
 * CDN URLs Configuration  
 * Centralized external URL constants
 */

export const CDN_URLS = {
  cloudinary: process.env.NEXT_PUBLIC_CLOUDINARY_URL || 'https://res.cloudinary.com',
  unsplash: 'https://unsplash.com',
  unsplashImages: 'https://images.unsplash.com',
  bunny: process.env.NEXT_PUBLIC_BUNNY_CDN_URL || '',
  github: 'https://github.com',
  external: 'https://external.com'
} as const;`;
      
      fs.writeFileSync(cdnConfigPath, cdnConfig);
      console.log(`✅ Created ${cdnConfigPath}`);
    }
  }

  getFilesToProcess() {
    const files = [];
    
    // Handle single file
    if (fs.existsSync(this.targetPath) && fs.statSync(this.targetPath).isFile()) {
      if ((this.targetPath.endsWith('.ts') || this.targetPath.endsWith('.tsx') || 
           this.targetPath.endsWith('.js') || this.targetPath.endsWith('.jsx')) &&
          !CONFIG.excludePatterns.some(pattern => 
            this.targetPath.match(pattern.replace('*', '.*')))) {
        files.push(this.targetPath);
      }
      return files;
    }
    
    function scanDirectory(dir) {
      const entries = fs.readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip excluded directories
          if (!CONFIG.excludePatterns.some(pattern => 
            entry.includes(pattern.replace('*', '')))) {
            scanDirectory(fullPath);
          }
        } else if (stat.isFile()) {
          // Include TS/JS/TSX/JSX files, exclude test files
          if ((entry.endsWith('.ts') || entry.endsWith('.tsx') || 
               entry.endsWith('.js') || entry.endsWith('.jsx')) &&
              !CONFIG.excludePatterns.some(pattern => 
                entry.match(pattern.replace('*', '.*')))) {
            files.push(fullPath);
          }
        }
      }
    }
    
    scanDirectory(this.targetPath);
    return files;
  }

  run() {
    console.log('🚀 LusoTown URL Replacement Codemod');
    console.log(`Target: ${this.targetPath}`);
    console.log(`Mode: ${this.dryRun ? 'DRY RUN' : 'LIVE'}`);
    console.log('');
    
    const totalReplacements = this.processFiles();
    
    if (totalReplacements > 0) {
      this.updateConfigFiles();
      
      console.log('\n✅ URL replacement complete!');
      console.log(`📊 Total replacements: ${totalReplacements}`);
      console.log(`🔧 Config types updated: ${Array.from(this.configUpdates).join(', ')}`);
      
      if (!this.dryRun) {
        console.log('\n🔄 Next steps:');
        console.log('1. Review updated files and config constants');
        console.log('2. Update environment variables for new config constants');
        console.log('3. Run npm run lint to check for any issues');
        console.log('4. Test the application to ensure URLs work correctly');
      }
    } else {
      console.log('✅ No hardcoded URLs found to replace.');
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1]
  };
  
  const replacer = new URLReplacer(options);
  replacer.run();
}

module.exports = URLReplacer;