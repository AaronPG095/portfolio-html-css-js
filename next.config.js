/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Enable modern image formats (AVIF is preferred, WebP as fallback)
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL for optimized images (in seconds)
    minimumCacheTTL: 60,
    // Allow optimization for external domains if needed in future
    remotePatterns: [],
  },
};

// Bundle analyzer (enabled when ANALYZE=true)
// Requires: npm install -D @next/bundle-analyzer
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: true,
      })
    : (config) => config;

module.exports = withBundleAnalyzer(nextConfig);