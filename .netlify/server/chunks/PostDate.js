import { c as create_ssr_component, g as add_attribute, j as is_void, k as compute_slots, f as escape } from "./index2.js";
import { format, parseISO } from "date-fns";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { as = "div" } = $$props;
  let { href = void 0 } = $$props;
  let { class: _class = void 0 } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  return `${((tag) => {
    return tag ? `<${as}${add_attribute("class", ["relative flex flex-col items-start group", _class].join(" "), 0)}>${is_void(tag) ? "" : `${slots.eyebrow ? slots.eyebrow({}) : ``}

  ${$$slots.title ? `<div class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">${href ? `<div class="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
        <a${add_attribute("href", href, 0)} data-sveltekit-prefetch><span class="absolute z-20 -inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl"></span>
          <span class="relative z-10">${slots.title ? slots.title({}) : ``}</span></a>` : `${slots.title ? slots.title({}) : ``}`}</div>` : ``}

  ${$$slots.description ? `<div class="${[
      "relative z-10 flex-1 text-sm text-zinc-600 dark:text-zinc-400",
      !!$$slots.title ? "mt-2" : ""
    ].join(" ").trim()}">${slots.description ? slots.description({}) : ``}</div>` : ``}

  ${$$slots.actions ? `<div aria-hidden="true" class="relative z-10 flex items-center mt-4">${slots.actions ? slots.actions({}) : ``}</div>` : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(as)}`;
});
const PostDate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { decorate } = $$props;
  let { post } = $$props;
  let { collapsed = false } = $$props;
  let { class: _class } = $$props;
  if ($$props.decorate === void 0 && $$bindings.decorate && decorate !== void 0)
    $$bindings.decorate(decorate);
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  if ($$props.collapsed === void 0 && $$bindings.collapsed && collapsed !== void 0)
    $$bindings.collapsed(collapsed);
  if ($$props.class === void 0 && $$bindings.class && _class !== void 0)
    $$bindings.class(_class);
  return `<div class="${[
    escape(
      [
        "relative z-10 order-first mb-3 flex text-zinc-500 dark:text-zinc-400",
        _class
      ].join(" "),
      true
    ),
    decorate ? "pl-3.5" : ""
  ].join(" ").trim()}">${decorate ? `<span class="absolute inset-y-0 left-0 flex items-center py-1" aria-hidden="true"><span class="h-full w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span></span>` : ``}
  <div class="${["flex", !collapsed ? "flex-col" : ""].join(" ").trim()}"><time${add_attribute("datetime", post.date, 0)}>${escape(format(new Date(parseISO(post.date)), "MMMM d, yyyy"))}</time>
    ${collapsed ? `<span class="mx-1">•</span>` : ``}
    <span>${escape(post.readingTime)}</span></div></div>`;
});
export {
  Card as C,
  PostDate as P
};
