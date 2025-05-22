import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"] // ✅ cho phép ảnh từ Cloudinary
  }
};

export default nextConfig;
