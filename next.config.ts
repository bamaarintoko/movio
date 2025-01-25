import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'], // Allow TMDB image URLs
  },
  reactStrictMode: false,

  /* config options here */
};

export default nextConfig;
