import type { ComponentPropsWithoutRef, FC } from "react";

import type { Post, ZennArticle } from "~/types/post";

import { Link } from "~/components/ui";
import { formatDate } from "~/lib/format-date";

export type ZennCardProps = ComponentPropsWithoutRef<"article"> & {
  post: Post;
  zennData?: ZennArticle;
};

const ZennCard: FC<ZennCardProps> = ({ post, zennData }) => (
  <Link
    className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800"
    href={post.url}
    rel="noopener noreferrer"
    target="_blank"
  >
    <article>
      {/* Top section with blue background and emoji */}
      <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-8 dark:from-blue-900/40 dark:to-blue-800/40">
        <div className="absolute top-3 left-3">
          <span className="rounded-xl bg-[#3EA8FF] px-2.5 py-1 text-xs font-medium text-white">
            Zenn
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <svg
            className="h-4 w-4 text-blue-400/60 dark:text-blue-300/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-5xl">{post.emoji}</span>
        </div>
      </div>

      {/* Bottom section with white background and content */}
      <div className="flex h-32 flex-col justify-between p-4">
        <h3 className="line-clamp-3 text-base leading-tight font-bold text-gray-900 dark:text-white">
          {post.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{formatDate(post.date)}</span>
          {(zennData?.liked_count ?? 0) > 0 && (
            <span className="flex items-center gap-1">
              <span>♡</span>
              <span>{zennData?.liked_count}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  </Link>
);

export default ZennCard;
