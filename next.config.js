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
};

module.exports = nextConfig;

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
    ORDER_ID: process.env.ORDER_ID,
    USER_ID: process.env.USER_ID,
  },
};
