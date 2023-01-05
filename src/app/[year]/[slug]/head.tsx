import DefaultHead from "~/components/common/Head";

type HeadProps = {
  params: {
    year: string;
    slug: string;
  };
};

export default function Head({ params: { year, slug } }: HeadProps) {
  const ogImageUrl =
    process.env.NODE_ENV === "production"
      ? `https://tdkn.dev/api/og/${year}/${slug}.png`
      : `http://localhost:3000/api/og/${year}/${slug}.png`;

  return (
    <>
      <DefaultHead />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:image" content={ogImageUrl} />
    </>
  );
}
