/** @type {import('next').NextConfig} */
const nextConfig = {
  // keep things simple/stable on Pages
  experimental: {},
  eslint: {
    // Skip ESLint during "next build" so CI doesn't need eslint packages
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
