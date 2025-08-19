/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lusotown/ui", "@lusotown/design-tokens"],
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
        source: '/streaming',
        destination: '/live',
        permanent: true,
      },
    ];
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Enable react-native-web + monorepo shared packages
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
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

    // Optimize for production
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
