import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/test',
  assetPrefix: '/test/',
};

export default nextConfig;
