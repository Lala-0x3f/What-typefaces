/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.stats = { ...(config.stats || {}), errorDetails: true };
    return config;
  },
};

module.exports = nextConfig;
