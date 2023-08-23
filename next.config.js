/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? 'producton' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

const nextConfig = {
  reactStrictMode: true,
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
    domains: ['img.29cm.co.kr', 'product.29cm.co.kr', 'localhost'],
  },
  rules: {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
};

module.exports = nextConfig;
