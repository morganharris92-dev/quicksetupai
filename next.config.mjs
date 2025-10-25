/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveAlias: {
        "@/components": "./components",
        "@/lib": "./lib"
      }
    }
  },
  images: {
    // Cloudflare Pages doesn't run Next's default image optimizer
    unoptimized: true
  }
};
export default nextConfig;
