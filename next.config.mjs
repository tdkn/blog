// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        destination: "https://github.com/tdkn",
        permanent: false,
        source: "/github",
      },
      {
        destination: "https://twitter.com/tdkn_",
        permanent: false,
        source: "/twitter",
      },
      {
        destination: "https://bsky.app/profile/tdkn.bsky.social",
        permanent: false,
        source: "/bluesky",
      },
      {
        destination: "https://mastodon.social/@tdkn",
        permanent: false,
        source: "/mastodon",
      },
      {
        destination: "https://facebook.com/shun.tedokon",
        permanent: false,
        source: "/facebook",
      },
    ];
  },
};

export default nextConfig;
