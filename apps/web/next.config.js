const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  transpilePackages: ["@turbostack/ui"],
  images: {
    remotePatterns: [
      { hostname: 'api.dicebear.com' },
      { hostname: 'avatar.vercel.sh' }
    ]
  },
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  }
};
