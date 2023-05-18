/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.coupangcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  //29cm도 해야됩니다.
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.coupang.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
