// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/tdkn",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/tdkn_",
        permanent: false,
      },
      {
        source: "/bluesky",
        destination: "https://bsky.app/profile/tdkn.bsky.social",
        permanent: false,
      },
      {
        source: "/mastodon",
        destination: "https://mastodon.social/@tdkn",
        permanent: false,
      },
      {
        source: "/facebook",
        destination: "https://facebook.com/shun.tedokon",
        permanent: false,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
