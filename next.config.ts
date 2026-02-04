import type { NextConfig } from 'next';

const repoName = 'test-devhive';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};
export default nextConfig;
