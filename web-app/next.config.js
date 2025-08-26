// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  transpilePackages: ["@lusotown/ui", "@lusotown/design-tokens"],
  productionBrowserSourceMaps: false,
  swcMinify: true,
  // Allow Playwright to access dev server via 127.0.0.1
  allowedDevOrigins: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  images: {
    // Disable image optimizer in development to avoid external fetch stalls during tests
    unoptimized: process.env.NODE_ENV !== 'production',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Allow Cloudinary-hosted assets (used across services/transport pages)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // In case any absolute URLs to our own Vercel domain are used with next/image
      {
        protocol: "https",
        hostname: "lusotown-london.vercel.app",
        port: "",
        pathname: "/**",
      },
      // Streaming infrastructure domains
      {
        protocol: "https",
        hostname: "stream.lusotown.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portuguese-content.lusotown.com",
        port: "",
        pathname: "/**",
      },
      // BunnyCDN domains for Portuguese content
      {
        protocol: "https",
        hostname: "*.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lusotown-portuguese-content.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lusotown-portuguese-streams.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      // YouTube thumbnail domains for Portuguese cultural content
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/streaming",
        destination: "/live",
        permanent: true,
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'lucide-react'],
    serverComponentsExternalPackages: ['html5-qrcode', 'socket.io-client'],
    // Enable dynamic imports for AI systems
    esmExternals: 'loose',
    // optimizeCss: true, // Temporarily disabled due to critters build issues
    // turbo: { // Temporarily disabled for stable build
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Enable react-native-web + monorepo shared packages
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ...config.resolve.extensions,
    ];

  // Fix chunk loading issues in development (client only)
  if (dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Externalize browser-only heavy libs from server bundle
    if (isServer) {
      const externals = config.externals || []
      config.externals = [
        ...externals,
        ({ request }, callback) => {
          if (!request) return callback()
          if (request === 'html5-qrcode' || request === 'socket.io-client') {
            return callback(null, `commonjs ${request}`)
          }
          return callback()
        }
      ]
    }

    // Enhanced optimization for production (client only)
  if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxAsyncRequests: 10,
        maxInitialRequests: 5,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          heroicons: {
            test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
            name: "heroicons",
            chunks: "all",
            priority: 20,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            chunks: "all",
            priority: 20,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 30,
          },
          // Separate AI systems into their own chunks
          aiSystems: {
            test: /[\\/]src[\\/](services|lib[\\/]ai|components[\\/](ai|matches))[\\/]/,
            name: "ai-systems",
            chunks: "async",
            priority: 25,
            enforce: true,
          },
          // Portuguese cultural components
          culturalComponents: {
            test: /[\\/]src[\\/](components[\\/](Cultural|Heritage|Portuguese)|config[\\/](lusophone|cultural))[\\/]/,
            name: "cultural-components",
            chunks: "async",
            priority: 15,
            enforce: true,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            enforce: true,
          },
        },
      };
      
  // Add performance optimizations with smart minification
  config.optimization.usedExports = true;
  config.optimization.sideEffects = false;
  config.optimization.minimize = true; // Enable minification for better performance
    }

    // Add bundle analyzer in development
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

// Sentry configuration for Portuguese community error tracking
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Only print logs for uploading source maps in CI
  silent: process.env.NODE_ENV !== 'development',
  
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  
  // Upload source maps for Portuguese community debugging
  hideSourceMaps: true,
  
  // Disable source map generation in development for faster builds
  disableServerWebpackPlugin: process.env.NODE_ENV === 'development',
  disableClientWebpackPlugin: process.env.NODE_ENV === 'development',
  
  // Portuguese community specific configuration
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Include Portuguese cultural content in source maps
  include: [
    '.next/static/',
    '.next/server/pages/',
    'src/components/monitoring/',
    'src/lib/monitoring/',
    'src/config/error-monitoring.ts'
  ],
  
  // Ignore non-essential files
  ignore: [
    'node_modules/',
    '.next/cache/',
    'public/',
    '*.test.*',
    '*.spec.*'
  ]
}

// Export with Sentry configuration if DSN is available
module.exports = process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig
