import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/test',
  assetPrefix: '/test/',
};

export default nextConfig;
