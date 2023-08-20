const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
async function load({ data }) {
  const component = data.post.isIndexFile ? (
    // vite requires relative paths and explicit file extensions for dynamic imports
    // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({}), `../../../../posts/${data.post.slug}/index.md`)
  ) : await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../../posts/go-deprecated-newdocument-in-goquery.md": () => import("../../../../chunks/go-deprecated-newdocument-in-goquery.js").then((n) => n._), "../../../../posts/go-kvs-closure-lesson.md": () => import("../../../../chunks/go-kvs-closure-lesson.js").then((n) => n._), "../../../../posts/ts-this-output-error.md": () => import("../../../../chunks/ts-this-output-error.js").then((n) => n._) }), `../../../../posts/${data.post.slug}.md`);
  return {
    post: data.post,
    component: component.default,
    layout: {
      fullWidth: true
    }
  };
}
export {
  load
};
