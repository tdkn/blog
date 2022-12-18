import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";
import PostsConfig from "~/config/posts.config";
import { assert } from "~/lib/assert";

function getTitle(req: NextRequest): string {
  const path = req.nextUrl.searchParams.getAll("path");
  const [year, filename] = path.flat();
  const slug = filename.split(".").shift();
  const post = PostsConfig.posts.find(
    (post) => post.year === year && post.slug === slug
  );

  assert(post !== undefined);

  return post.title;
}

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const title = getTitle(req);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://tdkn.dev"
      : "http://localhost:3000";
  const fontData = await fetch(
    `${baseUrl}/api/font?font=M+PLUS+Rounded+1c:wght@700&text=${encodeURIComponent(
      title
    )}`
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          alignItems: "center",
          fontFamily: "M PLUS Rounded 1c",
          fontWeight: "bold",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <span
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            margin: 50,
            height: 64,
          }}
        >
          <svg
            width="410"
            height="70"
            viewBox="0 0 410 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70ZM35 50C43.2843 50 50 43.2843 50 35C50 26.7157 43.2843 20 35 20C26.7157 20 20 26.7157 20 35C20 43.2843 26.7157 50 35 50Z"
              fill="url(#paint0_linear_213_186)"
            />
            <path
              d="M105.529 59.781C103.872 59.781 102.529 58.4379 102.529 56.781V24.658C102.529 23.0011 101.186 21.658 99.529 21.658H93C91.3431 21.658 90 20.3149 90 18.658V13C90 11.3431 91.3431 10 93 10H125.056C126.713 10 128.056 11.3431 128.056 13V18.658C128.056 20.3149 126.713 21.658 125.056 21.658H118.527C116.87 21.658 115.527 23.0011 115.527 24.658V56.781C115.527 58.4379 114.184 59.781 112.527 59.781H105.529ZM135.787 59.781C134.13 59.781 132.787 58.4379 132.787 56.781V13C132.787 11.3431 134.13 10 135.787 10H154.763C158.381 10 161.351 10.6477 163.674 11.943C165.996 13.1937 167.828 14.958 169.168 17.236C170.508 19.514 171.446 22.1717 171.982 25.209C172.518 28.2017 172.786 31.44 172.786 34.924C172.786 43.6787 171.289 50.0213 168.297 53.952C165.349 57.838 160.837 59.781 154.763 59.781H135.787ZM145.785 45.123C145.785 46.7799 147.128 48.123 148.785 48.123H153.423C155.879 48.123 157.554 47.0957 158.448 45.041C159.341 42.9863 159.788 39.614 159.788 34.924C159.788 31.976 159.632 29.631 159.319 27.889C159.051 26.1023 158.626 24.7623 158.046 23.869C157.51 22.9757 156.84 22.395 156.036 22.127C155.276 21.8143 154.405 21.658 153.423 21.658H148.785C147.128 21.658 145.785 23.0011 145.785 24.658V45.123ZM180.575 59.781C178.918 59.781 177.575 58.4379 177.575 56.781V13C177.575 11.3431 178.918 10 180.575 10H187.573C189.23 10 190.573 11.3431 190.573 13V26.363C190.573 28.0198 191.916 29.363 193.573 29.363H193.723C194.938 29.363 196.034 28.6294 196.497 27.5052L202.94 11.8578C203.403 10.7336 204.498 10 205.714 10H212.836C215.021 10 216.473 12.2605 215.565 14.2475L206.639 33.7691C206.266 34.5851 206.278 35.5253 206.671 36.3318L216.005 55.4657C216.977 57.4586 215.526 59.781 213.308 59.781H206.235C205.061 59.781 203.995 59.0961 203.507 58.0283L196.533 42.7737C196.045 41.7059 194.979 41.021 193.805 41.021H193.573C191.916 41.021 190.573 42.3641 190.573 44.021V56.781C190.573 58.4379 189.23 59.781 187.573 59.781H180.575ZM224.25 59.781C222.594 59.781 221.25 58.4379 221.25 56.781V13C221.25 11.3431 222.594 10 224.25 10H229.913C230.943 10 231.902 10.5286 232.451 11.4001L243.518 28.9539C245.122 31.4984 249.055 30.362 249.055 27.354V13C249.055 11.3431 250.399 10 252.055 10H259.053C260.71 10 262.053 11.3431 262.053 13V56.781C262.053 58.4379 260.71 59.781 259.053 59.781H253.391C252.36 59.781 251.402 59.2524 250.853 58.3809L239.786 40.8271C238.182 38.2826 234.248 39.419 234.248 42.427V56.781C234.248 58.4379 232.905 59.781 231.248 59.781H224.25ZM268.536 59.915C267.464 59.915 266.928 59.4013 266.928 58.374V50.535C266.928 49.4183 267.464 48.86 268.536 48.86H276.107C277.223 48.86 277.782 49.4183 277.782 50.535V58.374C277.782 58.9547 277.625 59.3567 277.313 59.58C277 59.8033 276.598 59.915 276.107 59.915H268.536ZM285.595 59.781C283.938 59.781 282.595 58.4379 282.595 56.781V13C282.595 11.3431 283.938 10 285.595 10H304.571C308.189 10 311.159 10.6477 313.482 11.943C315.804 13.1937 317.636 14.958 318.976 17.236C320.316 19.514 321.254 22.1717 321.79 25.209C322.326 28.2017 322.594 31.44 322.594 34.924C322.594 43.6787 321.097 50.0213 318.105 53.952C315.157 57.838 310.645 59.781 304.571 59.781H285.595ZM295.593 45.123C295.593 46.7799 296.936 48.123 298.593 48.123H303.231C305.687 48.123 307.362 47.0957 308.256 45.041C309.149 42.9863 309.596 39.614 309.596 34.924C309.596 31.976 309.439 29.631 309.127 27.889C308.859 26.1023 308.434 24.7623 307.854 23.869C307.318 22.9757 306.648 22.395 305.844 22.127C305.084 21.8143 304.213 21.658 303.231 21.658H298.593C296.936 21.658 295.593 23.0011 295.593 24.658V45.123ZM340.515 60.183C339.443 60.183 338.147 60.0713 336.629 59.848C335.155 59.6247 333.703 59.1333 332.274 58.374C330.889 57.6147 329.728 56.4533 328.79 54.89C327.852 53.282 327.383 51.0933 327.383 48.324V22.328C327.383 19.916 327.762 17.906 328.522 16.298C329.281 14.69 330.264 13.4393 331.47 12.546C332.676 11.608 334.016 10.9603 335.49 10.603C336.964 10.201 338.393 10 339.778 10C343.53 10 346.746 10.067 349.426 10.201C352.15 10.2903 354.495 10.402 356.461 10.536C357.393 10.5982 358.273 10.6651 359.1 10.7369C360.615 10.8685 361.754 12.1515 361.754 13.6727V18.993C361.754 20.6499 360.41 21.993 358.754 21.993H343.798C341.52 21.993 340.381 22.9757 340.381 24.941V26.2045C340.381 27.8179 341.657 29.1424 343.269 29.2024L355.515 29.6576C357.127 29.7176 358.404 31.0421 358.404 32.6556V37.1925C358.404 38.8059 357.127 40.1304 355.515 40.1904L343.269 40.6456C341.657 40.7056 340.381 42.0301 340.381 43.6436V44.505C340.381 45.711 340.649 46.6043 341.185 47.185C341.721 47.721 342.413 47.989 343.262 47.989H358.754C360.41 47.989 361.754 49.3321 361.754 50.989V56.3665C361.754 57.8632 360.651 59.1348 359.163 59.2942C357.926 59.4266 356.601 59.5442 355.188 59.647C352.731 59.8257 350.23 59.9597 347.684 60.049C345.138 60.1383 342.748 60.183 340.515 60.183ZM382.119 59.781C380.79 59.781 379.619 58.9069 379.242 57.6327L366.279 13.8517C365.709 11.9291 367.15 10 369.155 10H376.297C377.658 10 378.848 10.916 379.197 12.2314L385.152 34.7026C385.941 37.6778 390.163 37.6779 390.952 34.7026L396.908 12.2314C397.256 10.916 398.447 10 399.808 10H406.815C408.82 10 410.261 11.9291 409.692 13.8517L396.728 57.6327C396.351 58.9069 395.18 59.781 393.852 59.781H382.119Z"
              fill="#252525"
            />
            <defs>
              <linearGradient
                id="paint0_linear_213_186"
                x1="35"
                y1="35"
                x2="70"
                y2="70"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F7C953" />
                <stop offset="1" stop-color="#F77A53" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <div
          style={{
            fontSize: 50,
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          {title}
        </div>
        <div
          style={{
            right: 0,
            bottom: 0,
            margin: 50,
            position: "absolute",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          @tdkn_
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "twemoji",
      fonts: [{ name: "M PLUS Rounded 1c", data: fontData, style: "normal" }],
    }
  );
}
