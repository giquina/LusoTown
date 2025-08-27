/** @type {import('next').NextConfig} */
const nextConfig = {
  // Memory optimization for large component libraries (497+ components)
  experimental: {
    // Enable SWC compiler optimizations for better memory usage
    swcMinify: true,
    // Reduce memory usage during build
    cpus: Math.max(1, Math.floor(require('os').cpus().length / 2)),
    // Enable worker threads optimization
    workerThreads: false, // Disable to save memory in constrained environments
    // Optimize for build performance
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  
  // Webpack optimizations for large codebases
  webpack: (config, { dev, isServer }) => {
    // Memory optimization
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        // Split chunks more aggressively to reduce memory pressure
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all'
            },
            // Separate large libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 10
            },
            heroicons: {
              test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
              name: 'heroicons',
              chunks: 'all',
              priority: 5
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 5
            }
          }
        }
      };
      
      // Reduce memory usage by limiting cache size
      config.cache = {
        type: 'memory',
        maxGenerations: 1
      };
    }
    
    // Externalize server-side only packages to reduce bundle size
    if (isServer) {
      config.externals.push('html5-qrcode', 'socket.io-client');
    }
    
    // Resolve aliases for react-native compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web'
    };
    
    return config;
  },
  
  // TypeScript configuration for memory-constrained builds
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
    // Optimize TypeScript compilation for large component libraries
    tsconfigPath: './tsconfig.json'
  },
  
  // SWC optimizations for large codebases  
  swcMinify: true,
  compiler: {
    // Remove console.logs in production builds to reduce bundle size
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
      'img.youtube.com',
      'i.ytimg.com',
      'lusotown.b-cdn.net'
    ]
  },
  
  // Output optimization
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Note: telemetry is disabled via environment variable NEXT_TELEMETRY_DISABLED=1
  
  // PoweredByHeader
  poweredByHeader: false,
  
  // Reduce build time and memory usage
  productionBrowserSourceMaps: false,
  
  // Custom headers for performance
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;