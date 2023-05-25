/** @type {import('next').NextConfig} */

const nextPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.29cm.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};




module.exports = nextConfig;
