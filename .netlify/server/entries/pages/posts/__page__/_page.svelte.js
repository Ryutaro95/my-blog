import { c as create_ssr_component, f as escape, v as validate_component, g as add_attribute } from "../../../../chunks/index2.js";
import { n as name } from "../../../../chunks/info.js";
import { A as ArrowLeftIcon } from "../../../../chunks/ArrowLeftIcon.js";
import { P as PostsList, A as ArrowRightIcon } from "../../../../chunks/PostsList.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "a.svelte-9puhmz{display:flex;align-items:center;gap:0.5rem;font-weight:500;--tw-text-opacity:1;color:rgb(63 63 70 / var(--tw-text-opacity))\n}.dark a.svelte-9puhmz{--tw-text-opacity:1;color:rgb(212 212 216 / var(--tw-text-opacity))\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFirstPage;
  let hasNextPage;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  isFirstPage = data.page === 1;
  hasNextPage = data.posts[data.posts.length - 1]?.previous;
  return `${$$result.head += `<!-- HEAD_svelte-1j9di4b_START -->${$$result.title = `<title>${escape(name)} | Posts</title>`, ""}<!-- HEAD_svelte-1j9di4b_END -->`, ""}

<div class="flex flex-col flex-grow"><header class="pt-4"><h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Writing on tech, music, and whatever else I feel like
    </h1>
    <p class="mt-6">All of my written content collected in one place</p></header>

  <div class="mt-16 sm:mt-20">${validate_component(PostsList, "PostsList").$$render($$result, { posts: data.posts }, {}, {})}</div>

  
  <div class="flex items-center justify-between pt-16 pb-8">${!isFirstPage ? `<a${add_attribute("href", `/posts/${data.page - 1}`, 0)} data-sveltekit-prefetch class="svelte-9puhmz">${validate_component(ArrowLeftIcon, "ArrowLeftIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}
        Previous
      </a>` : `<div></div>`}

    ${hasNextPage ? `<a${add_attribute("href", `/posts/${data.page + 1}`, 0)} data-sveltekit-prefetch class="svelte-9puhmz">Next
        ${validate_component(ArrowRightIcon, "ArrowRightIcon").$$render($$result, { class: "w-4 h-4" }, {}, {})}</a>` : ``}</div>
</div>`;
});
export {
  Page as default
};
