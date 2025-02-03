import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'], // Allow Unsplash images
    domains: ['images.unsplash.com', 'i.pravatar.cc'],
  },
};

export default nextConfig;