/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig