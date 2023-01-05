// @ts-check
const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    appDir: true,
  },
};

module.exports = withContentlayer(nextConfig);
