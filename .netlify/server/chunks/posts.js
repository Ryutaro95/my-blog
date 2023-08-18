import { _ as __vite_glob_0_0 } from "./botyan.js";
import { _ as __vite_glob_0_1 } from "./index3.js";
import { _ as __vite_glob_0_2 } from "./hoge.js";
import { _ as __vite_glob_0_3 } from "./lorem-ipsum.js";
import { _ as __vite_glob_0_4 } from "./sample-markdown-post.js";
import { _ as __vite_glob_0_5 } from "./test.js";
import { _ as __vite_glob_0_6 } from "./index4.js";
import { format } from "date-fns";
import { parse } from "node-html-parser";
import readingTime from "reading-time/lib/reading-time.js";
const posts = Object.entries(/* @__PURE__ */ Object.assign({ "/posts/botyan.md": __vite_glob_0_0, "/posts/getting-started/index.md": __vite_glob_0_1, "/posts/hoge.md": __vite_glob_0_2, "/posts/lorem-ipsum.md": __vite_glob_0_3, "/posts/sample-markdown-post.md": __vite_glob_0_4, "/posts/test.md": __vite_glob_0_5, "/posts/update-started/index.md": __vite_glob_0_6 })).map(([filepath, post]) => {
  const html = parse(post.default.render().html);
  const preview = post.metadata.preview ? parse(post.metadata.preview) : html.querySelector("p");
  return {
    ...post.metadata,
    // generate the slug from the file path
    slug: filepath.replace(/(\/index)?\.md/, "").split("/").pop(),
    // whether or not this file is `my-post.md` or `my-post/index.md`
    // (needed to do correct dynamic import in posts/[slug].svelte)
    isIndexFile: filepath.endsWith("/index.md"),
    // format date as yyyy-MM-dd
    date: post.metadata.date ? format(
      // offset by timezone so that the date is correct
      addTimezoneOffset(new Date(post.metadata.date)),
      "yyyy-MM-dd"
    ) : void 0,
    preview: {
      html: preview.toString(),
      // text-only preview (i.e no html elements), used for SEO
      text: preview.structuredText ?? preview.toString()
    },
    // get estimated reading time for the post
    readingTime: readingTime(html.structuredText).text
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post, index, allPosts) => ({
  ...post,
  next: allPosts[index - 1],
  previous: allPosts[index + 1]
}));
function addTimezoneOffset(date) {
  const offsetInMilliseconds = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
  return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
export {
  posts as p
};
