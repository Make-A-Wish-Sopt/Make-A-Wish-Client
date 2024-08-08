/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
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
    domains: [
      'img.29cm.co.kr',
      'img2.29cm.co.kr',
      'product.29cm.co.kr',
      'localhost',
      'wish-image-bucket.s3.ap-northeast-2.amazonaws.com',
      'shopping-phinf.pstatic.net',
    ],
  },
  rules: {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
};

export default nextConfig;
