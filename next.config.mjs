/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
    optimizeCss: true
  },
  eslint: {
    // Skip ESLint during "next build" so CI doesn't need eslint packages
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
