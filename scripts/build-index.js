const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const POSTS_PATH = path.join(process.cwd(), "posts");
const posts = glob.sync("**/*.mdx", { cwd: POSTS_PATH }).map((relativePath) => {
  const absolutePath = path.join(POSTS_PATH, relativePath);
  const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");
  const source = fs.readFileSync(absolutePath);
  const { title } = matter(source).data;

  return {
    year,
    slug,
    title,
  };
});

const data = JSON.stringify({ posts }, null, "  ");

fs.writeFileSync("./posts/index.json", data);
