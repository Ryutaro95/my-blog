import { c as create_ssr_component, v as validate_component, i as each, g as add_attribute, f as escape, j as is_void, m as missing_component } from "../../../../chunks/index2.js";
import { w as website, n as name, a as avatar, b as bio } from "../../../../chunks/info.js";
import { C as Card, P as PostDate } from "../../../../chunks/PostDate.js";
import { A as ArrowLeftIcon } from "../../../../chunks/ArrowLeftIcon.js";
import { S as SocialLinks } from "../../../../chunks/SocialLinks.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const ToC_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".heading.svelte-t48kcq{padding-left:calc(var(--depth, 0) * 0.35rem)}.active.svelte-t48kcq{margin-left:-2px;border-left-width:2px;font-weight:500;--tw-text-opacity:1;color:rgb(15 23 42 / var(--tw-text-opacity))}.dark .active.svelte-t48kcq{--tw-text-opacity:1;color:rgb(241 245 249 / var(--tw-text-opacity))}",
  map: null
};
const ToC = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  let headings = post.headings;
  let activeHeading = headings[0];
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  $$result.css.add(css$1);
  return `

${validate_component(Card, "Card").$$render($$result, {}, {}, {
    description: () => {
      return `${slots.default ? slots.default({ slot: "description" }) : `
    <ul class="flex flex-col gap-2">${each(headings, (heading) => {
        return `<li class="${[
          "pl-2 transition-colors border-teal-500 heading text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 svelte-t48kcq",
          activeHeading === heading ? "active" : ""
        ].join(" ").trim()}"${add_attribute(
          "style",
          `--depth: ${// consider h1 and h2 at the same depth, as h1 will only be used for page title
          Math.max(0, heading.depth - 1)}`,
          0
        )}><a${add_attribute("href", `#${heading.id}`, 0)}>${escape(heading.value)}</a>
        </li>`;
      })}</ul>
  `}`;
    }
  })}`;
});
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".root.svelte-1eui11k{display:grid;grid-template-columns:1fr}@media(min-width: 1024px){.root.svelte-1eui11k{grid-template-columns:1fr 42rem 1fr}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(data.post.title)}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;
  const url = `${website}/${data.post.slug}`;
  let canGoBack = false;
  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith("/posts")) {
      canGoBack = true;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-7wmra1_START -->${$$result.title = `<title>${escape(data.post.title)} - ${escape(name)}</title>`, ""}<meta name="description"${add_attribute("content", data.post.preview.text, 0)}><meta name="author"${add_attribute("content", name, 0)}><meta property="og:url"${add_attribute("content", url, 0)}><meta property="og:type" content="website"><meta property="og:title"${add_attribute("content", data.post.title, 0)}><meta property="og:description"${add_attribute("content", data.post.preview.text, 0)}><meta property="og:image"${add_attribute("content", ogImage, 0)}><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain"${add_attribute("content", website, 0)}><meta property="twitter:url"${add_attribute("content", url, 0)}><meta name="twitter:title"${add_attribute("content", data.post.title, 0)}><meta name="twitter:description"${add_attribute("content", data.post.preview.text, 0)}><meta name="twitter:image"${add_attribute("content", ogImage, 0)}><!-- HEAD_svelte-7wmra1_END -->`, ""}

<div class="root max-w-2xl mx-auto lg:max-w-none svelte-1eui11k"><div class="hidden lg:block pt-8"><div class="sticky top-0 w-full flex justify-end pt-11 pr-8">${((tag) => {
    return tag ? `<${canGoBack ? "button" : "a"} class="items-center justify-center hidden w-10 h-10 mb-8 transition bg-white rounded-full shadow-md -top-1 -left-16 lg:flex group shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:focus-visible:ring-2 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"${add_attribute("href", canGoBack ? void 0 : "/posts", 0)} aria-label="Go back to posts">${is_void(tag) ? "" : `${validate_component(ArrowLeftIcon, "ArrowLeftIcon").$$render(
      $$result,
      {
        class: "w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
      },
      {},
      {}
    )}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(canGoBack ? "button" : "a")}</div></div>

  <div class="w-full mx-auto overflow-x-hidden"><article><header class="flex flex-col"><h1 class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">${escape(data.post.title)}</h1>
        ${validate_component(PostDate, "PostDate").$$render(
    $$result,
    {
      class: "text-sm sm:text-base",
      post: data.post,
      decorate: true,
      collapsed: true
    },
    {},
    {}
  )}</header>

      
      <div class="prose dark:prose-invert ">${validate_component(data.component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div></article>

    
    <hr>
    <div class="py-8"><div class="grid gap-8"><div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">${validate_component(SocialLinks, "SocialLinks").$$render($$result, {}, {}, {})}</div>
        <div class="flex justify-center order-2 md:order-1 md:col-span-2"><a href="/" class="inline-block rounded-full"><img${add_attribute("src", avatar, 0)}${add_attribute("alt", name, 0)} class="w-24 h-24 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"></a></div>
        <p class="order-3 text-base text-zinc-600 dark:text-zinc-400">${escape(bio)}</p></div></div></div>

  
  <div class="hidden xl:block pt-10"><aside class="sticky hidden w-48 ml-8 xl:block top-8" aria-label="Table of Contents">${validate_component(ToC, "ToC").$$render($$result, { post: data.post }, {}, {})}</aside></div>
</div>`;
});
export {
  Page as default
};
