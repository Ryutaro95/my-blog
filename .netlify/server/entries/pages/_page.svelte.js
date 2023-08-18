import { c as create_ssr_component, f as escape, g as add_attribute, v as validate_component } from "../../chunks/index2.js";
import { A as ArrowRightIcon, P as PostsList } from "../../chunks/PostsList.js";
import { S as SocialLinks } from "../../chunks/SocialLinks.js";
import { b as bio, a as avatar, n as name } from "../../chunks/info.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1cbbdsg_START -->${$$result.title = `<title>${escape(name)}</title>`, ""}<meta name="description"${add_attribute("content", bio, 0)}><!-- HEAD_svelte-1cbbdsg_END -->`, ""}

<div class="flex flex-col flex-grow gap-8 pb-16">
  <section class="flex flex-col items-center gap-16 pt-8 pb-16"><div class="flex flex-col items-center w-full gap-6 rounded-lg"><img${add_attribute("src", avatar, 0)}${add_attribute("alt", name, 0)} class="mx-auto rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700">
      <div class="flex gap-6">${validate_component(SocialLinks, "SocialLinks").$$render($$result, {}, {}, {})}</div>
      <p class="text-base text-zinc-600 dark:text-zinc-400">${escape(bio)}</p></div></section>
  <section class="w-full"><div class="flex items-center justify-between gap-4 mb-8"><h2 class="text-sm font-medium sm:text-base text-zinc-500 dark:text-zinc-400">Recently Published
      </h2>
      <a href="/posts" class="flex items-center gap-1 text-sm font-medium text-teal-500">View All ${validate_component(ArrowRightIcon, "ArrowRightIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a></div>
    ${validate_component(PostsList, "PostsList").$$render($$result, { posts: data.posts }, {}, {})}</section></div>`;
});
export {
  Page as default
};
