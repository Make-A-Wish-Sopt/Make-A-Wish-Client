/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '', // 또는 '3000' 등 개발 서버 포트
      },
      {
        protocol: 'https',
        hostname: 'sunmulzu-wish-image-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sunmulzu.com',
      },
    ],
  },
  eslint: {
    dirs: ['__test__'],
  },
};

export default nextConfig;
