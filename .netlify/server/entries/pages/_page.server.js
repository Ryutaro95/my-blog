import { p as posts } from "../../chunks/posts.js";
async function load() {
  return {
    posts: posts.slice(0, 5)
  };
}
export {
  load
};
