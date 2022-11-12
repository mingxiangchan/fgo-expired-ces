/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["static.atlasacademy.io"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
