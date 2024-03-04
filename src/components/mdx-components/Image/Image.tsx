import NextImage, { ImageProps } from "next/image";

const shimmer = (w?: number | string, h?: number | string) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    </svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const Image = ({ height, width, ...otherProps }: ImageProps) => (
  <NextImage
    blurDataURL={`data:image/svg+xml;base64,${toBase64(
      shimmer(width, height),
    )}`}
    height={height}
    placeholder="blur"
    sizes="100vw"
    style={{ height: "auto", width: "100%" }}
    width={width}
    {...otherProps}
  />
);

export default Image;
