/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  transpilePackages: ["@lusotown/ui", "@lusotown/design-tokens"],
  productionBrowserSourceMaps: false,
  swcMinify: false,
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
    esmExternals: 'loose',
    scrollRestoration: true,
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  serverComponentsExternalPackages: ['html5-qrcode', 'socket.io-client'],
    // Disable turbo experiment in production builds due to instability/perf issues
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
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            enforce: true,
          },
        },
      };
      
  // Add performance optimizations but avoid costly minification in CI
  config.optimization.usedExports = true;
  config.optimization.sideEffects = false;
  config.optimization.minimize = false;
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
