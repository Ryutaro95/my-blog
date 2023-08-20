import { _ as __vite_glob_0_0 } from "./go-deprecated-newdocument-in-goquery.js";
import { _ as __vite_glob_0_1 } from "./go-kvs-closure-lesson.js";
import { _ as __vite_glob_0_2 } from "./ts-this-output-error.js";
import { format } from "date-fns";
import { parse } from "node-html-parser";
import readingTime from "reading-time/lib/reading-time.js";
const posts = Object.entries(/* @__PURE__ */ Object.assign({ "/posts/go-deprecated-newdocument-in-goquery.md": __vite_glob_0_0, "/posts/go-kvs-closure-lesson.md": __vite_glob_0_1, "/posts/ts-this-output-error.md": __vite_glob_0_2 })).map(([filepath, post]) => {
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
