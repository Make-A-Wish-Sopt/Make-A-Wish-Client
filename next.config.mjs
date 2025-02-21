/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  swcMinify: true,
  images: {
    formats: ['image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sunmulzu-wish-image-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sunmulzu.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  eslint: {
    dirs: ['__test__'],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true, // default!
})(nextConfig);
