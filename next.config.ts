import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['play.pokemonshowdown.com', 'raw.githubusercontent.com'],
  },
};

export default nextConfig;
