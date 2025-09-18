/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important for Docker
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;