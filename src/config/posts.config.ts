import type { PostsConfig } from "~/types/posts-config";

const config: PostsConfig = {
  posts: [
    {
      year: "2020",
      slug: "swiftui-darkmode",
      title: "SwiftUI のダークモードプレビュー時の不具合を回避する",
    },
    {
      year: "2021",
      slug: "how-to-use-yarn-patch",
      title: "yarn patch の使い方",
    },
    {
      year: "2021",
      slug: "vercel-next-playwright",
      title: "Vercel + Next.js + PlaywrightでOGP画像をページ別に自動生成する",
    },
    {
      year: "2022",
      slug: "aws-cli",
      title: "AWS CLI を docker run 経由で使う",
    },
  ],
};

export default config;
