/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true
  }
}

module.exports = nextConfig