import { c as create_ssr_component, b as spread, e as escape_object, v as validate_component, f as escape, i as each } from "./index2.js";
import { C as Card, P as PostDate } from "./PostDate.js";
const ArrowRightIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 20 20" },
      { fill: "currentColor" },
      escape_object($$props)
    ],
    {}
  )}><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
});
const PostPreview_svelte_svelte_type_style_lang = "";
const css = {
  code: ".prose.svelte-1c2379o>p{margin-top:0;margin-bottom:0}",
  map: null
};
const PostPreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  $$result.css.add(css);
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      href: `/post/${post.slug}`,
      "data-sveltekit-prefetch": true
    },
    {},
    {
      actions: () => {
        return `<div slot="actions"><div class="flex items-center text-teal-500"><span class="text-sm font-medium">Read</span>
      ${validate_component(ArrowRightIcon, "ArrowRightIcon").$$render($$result, { class: "w-4 h-4 ml-1" }, {}, {})}</div></div>`;
      },
      description: () => {
        return `<div slot="description" class="prose dark:prose-invert svelte-1c2379o"><!-- HTML_TAG_START -->${post.preview.html}<!-- HTML_TAG_END --></div>`;
      },
      title: () => {
        return `${slots.default ? slots.default({ slot: "title" }) : `${escape(post.title)}`}`;
      },
      eyebrow: () => {
        return `${slots.eyebrow ? slots.eyebrow({ slot: "eyebrow" }) : ``}`;
      }
    }
  )}`;
});
const PostsList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  return `<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">${each(posts, (post) => {
    return `<article class="grid items-start grid-cols-4 gap-8">${validate_component(PostDate, "PostDate").$$render(
      $$result,
      {
        class: "flex-col hidden md:flex text-sm",
        post
      },
      {},
      {}
    )}

      <div class="col-span-4 md:col-span-3">${validate_component(PostPreview, "PostPreview").$$render($$result, { post }, {}, {
      eyebrow: () => {
        return `${slots.default ? slots.default({ slot: "eyebrow" }) : `
            ${validate_component(PostDate, "PostDate").$$render(
          $$result,
          {
            class: "md:hidden",
            post,
            collapsed: true,
            decorate: true
          },
          {},
          {}
        )}
          `}`;
      }
    })}</div>
    </article>`;
  })}</div>`;
});
export {
  ArrowRightIcon as A,
  PostsList as P
};
