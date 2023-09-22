// @ts-check
const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
};

module.exports = withContentlayer(nextConfig);
