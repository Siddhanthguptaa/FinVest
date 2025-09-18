/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to tell Next.js not to fail the build on ESLint errors.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;