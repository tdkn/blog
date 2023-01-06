import DefaultHead from "~/components/common/Head";

const ogImageUrl =
  process.env.NODE_ENV === "production"
    ? "https://tdkn.dev/twitter-large-card.png"
    : "http://localhost:3000/twitter-large-card.png";

export default function Head() {
  return (
    <>
      <DefaultHead />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:image" content={ogImageUrl} />
    </>
  );
}
