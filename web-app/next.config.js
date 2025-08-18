/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (config, { dev, isServer }) => {
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
