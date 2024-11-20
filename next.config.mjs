/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  swcMinify: true,
  images: {
    domains: ['localhost', 'wish-image-bucket.s3.ap-northeast-2.amazonaws.com', 'sunmulzu.com'],
  },
  eslint: {
    dirs: ['__test__'],
  },
};

export default nextConfig;
