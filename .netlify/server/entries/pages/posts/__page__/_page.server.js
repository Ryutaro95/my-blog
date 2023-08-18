import { p as posts } from "../../../../chunks/posts.js";
import { e as error } from "../../../../chunks/index.js";
function paginate(data, { page = 1, limit } = {}) {
  if (limit) {
    return data.slice((page - 1) * limit, page * limit);
  }
  return data;
}
async function load({ params }) {
  let page = params.page ? parseInt(params.page) : 1;
  let limit = 10;
  const postsForPage = paginate(posts, { limit, page });
  if (postsForPage.length === 0 && page > 1) {
    throw error(404, "Page not found");
  }
  return {
    posts: postsForPage,
    page,
    limit
  };
}
export {
  load
};
