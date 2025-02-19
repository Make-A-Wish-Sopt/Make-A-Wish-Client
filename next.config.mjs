/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  // enabled: true,
  // openAnalyzer: true,
});

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'sunmulzu-wish-image-bucket.s3.ap-northeast-2.amazonaws.com',
      'sunmulzu.com',
    ],
  },
  eslint: {
    dirs: ['__test__'],
  },
};

export default nextConfig;
