/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },

  basePath: '/shakthi-portfolio',
  assetPrefix: '/shakthi-portfolio/',
};

export default nextConfig;