import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  basePath: '/test-devhive',
  trailingSlash: true,
};

export default nextConfig;
