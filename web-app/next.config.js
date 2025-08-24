/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  transpilePackages: ["@lusotown/ui", "@lusotown/design-tokens"],
  productionBrowserSourceMaps: false,
  swcMinify: true,
  optimizeFonts: false, // Disable font optimization to prevent build-time fetching
  images: {
    unoptimized: false,
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
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'react-hot-toast', 'lucide-react'],
    serverComponentsExternalPackages: ['html5-qrcode', 'socket.io-client'],
    optimizeServerReact: true,
    serverMinification: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    // Disable turbo experiment in production builds due to instability/perf issues
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Suppress SWC binary warnings for unused platforms
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // Suppress specific webpack cache warnings for missing SWC binaries
    const originalWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings = [
      ...originalWarnings,
      /Managed item.*@next\/swc-.*isn't a directory or doesn't contain a package\.json/,
    ];
    
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

    // Fix chunk loading issues in development
    if (dev) {
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
            return callback(null, 'commonjs ' + request)
          }
          return callback()
        }
      ]
    }

    // Enhanced optimization for production
  if (!dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxAsyncRequests: 10,
        maxInitialRequests: 5,
        minSize: 20000,
        maxSize: 244000, // ~240KB
        cacheGroups: {
          // Portuguese-speaking community specific bundles
          portuguese: {
            test: /[\\/]portuguese[\\/]/,
            name: 'portuguese-features',
            chunks: 'all',
            priority: 35,
          },
          cultural: {
            test: /[\\/]cultural[\\/]/,
            name: 'cultural-components',
            chunks: 'all',
            priority: 30,
          },
          // Core framework bundles
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 40,
          },
          // UI Library bundles
          heroicons: {
            test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
            name: "heroicons",
            chunks: "all",
            priority: 25,
          },
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            chunks: "all",
            priority: 25,
          },
          // Animation and interaction bundles
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|react-spring|@react-spring)[\\/]/,
            name: "animations",
            chunks: "all",
            priority: 20,
          },
          // Utility libraries
          utils: {
            test: /[\\/]node_modules[\\/](date-fns|clsx|tailwind-merge|lucide-react)[\\/]/,
            name: "utils",
            chunks: "all",
            priority: 15,
          },
          // Large vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            maxSize: 244000, // ~240KB
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
      
  // Performance optimizations for production
  config.optimization.usedExports = true;
  config.optimization.sideEffects = false;
  config.optimization.providedExports = true;
  config.optimization.concatenateModules = true;
  config.optimization.minimize = true;
  
  // Enable tree shaking for better bundle sizes
  if (config.optimization.minimizer) {
    config.optimization.minimizer.forEach(minimizer => {
      if (minimizer.constructor.name === 'TerserPlugin') {
        minimizer.options.terserOptions = {
          ...minimizer.options.terserOptions,
          compress: {
            ...minimizer.options.terserOptions?.compress,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info'],
          },
          mangle: {
            safari10: true,
          },
        };
      }
    });
  }
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

module.exports = nextConfig;
