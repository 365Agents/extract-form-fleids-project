/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // Remove static export since we have API routes
  experimental: {
    outputFileTracingRoot: undefined,
  }
}

module.exports = nextConfig