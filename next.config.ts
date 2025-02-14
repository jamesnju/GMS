import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: false, // Disable SWC minification

  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc'], // Add all required domains in one array
  },
};

export default nextConfig;