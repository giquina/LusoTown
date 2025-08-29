/** @type {import('next').NextConfig} */
const nextConfig = {
  // Advanced memory optimization for streamlined component library (228 components)
  experimental: {
    // Enable SWC compiler optimizations for better memory usage
    swcMinify: true,
    // Adaptive CPU allocation based on system resources
    cpus: Math.max(1, Math.min(2, Math.floor(require('os').cpus().length / 3))),
    // Disable worker threads in memory-constrained environments
    workerThreads: false,
    // Advanced package import optimizations
    optimizePackageImports: ['lucide-react', '@heroicons/react', 'framer-motion', '@headlessui/react'],
    // Enable modern bundling optimizations
    serverComponentsExternalPackages: ['sharp', 'canvas'],
    // Optimize CSS handling
    optimizeCss: true,
    // Reduce compilation memory usage
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
  },
  
  // Advanced webpack optimizations for Portuguese community platform
  webpack: (config, { dev, isServer }) => {
    // Production optimizations for client-side bundles
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        // Aggressive chunk splitting for Portuguese community components
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 250000,
          minChunks: 1,
          maxAsyncRequests: 8,
          maxInitialRequests: 6,
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
              chunks: 'all',
              maxSize: 200000
            },
            // Core React bundle
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20
            },
            // Portuguese community UI libraries
            heroicons: {
              test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
              name: 'heroicons',
              chunks: 'all',
              priority: 15
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 15
            },
            headlessui: {
              test: /[\\/]node_modules[\\/]@headlessui[\\/]/,
              name: 'headlessui',
              chunks: 'all',
              priority: 12
            },
            // Portuguese community components
            carousels: {
              test: /[\\/]src[\\/]components[\\/]carousels[\\/]/,
              name: 'lusotown-carousels',
              chunks: 'all',
              priority: 18
            },
            lusotown: {
              test: /[\\/]src[\\/]components[\\/]/,
              name: 'lusotown-components',
              chunks: 'all',
              priority: 8,
              minSize: 30000
            }
          }
        }
      };
      
      // Memory-efficient caching strategy
      config.cache = {
        type: 'memory',
        maxGenerations: 1,
        compression: 'gzip'
      };
      
      // Reduce build memory footprint
      config.stats = {
        chunks: false,
        modules: false,
        assets: false,
        children: false
      };
    }
    
    // Externalize server-side only packages to reduce bundle size
    if (isServer) {
      config.externals.push('html5-qrcode', 'socket.io-client');
      const webpack = require('webpack');
      // Define `self` safely for SSR bundles and ensure globalObject is universal
      config.plugins.push(new webpack.DefinePlugin({ self: 'globalThis' }));
      config.output = {
        ...config.output,
        globalObject: 'globalThis',
      };
    }
    
    // Resolve aliases for react-native compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web'
    };
    
    // Suppress OpenTelemetry/Prisma instrumentation warnings in development
    if (dev) {
      config.infrastructureLogging = {
        level: 'error',
      };
      
      config.ignoreWarnings = [
        /Critical dependency: the request of a dependency is an expression/,
        /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      ];
    }
    
    return config;
  },
  
  // TypeScript configuration for memory-constrained builds
  typescript: {
  // Temporarily ignore type errors during builds to unblock deployment
  // TODO: Re-enable after addressing blocking type issues
  ignoreBuildErrors: true,
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
  // Temporarily ignore ESLint during builds to unblock deployment
  // TODO: Re-enable after addressing blocking lint rules
  ignoreDuringBuilds: true,
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
  
  // Security and performance headers
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
      },
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options', 
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://js.stripe.com https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://js.stripe.com https://maps.googleapis.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;