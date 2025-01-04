const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  transpilePackages: ["@turbostack/ui"],
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
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
