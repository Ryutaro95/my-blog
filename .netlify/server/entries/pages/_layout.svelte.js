import { c as create_ssr_component, b as spread, e as escape_object, d as subscribe, f as escape, g as add_attribute, v as validate_component } from "../../chunks/index2.js";
import { n as name } from "../../chunks/info.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const prism = "";
const MoonIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 20 20" },
      { fill: "currentColor" },
      escape_object($$props)
    ],
    {}
  )}><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
});
const SunIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 20 20" },
      { fill: "currentColor" },
      escape_object($$props)
    ],
    {}
  )}><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isDarkMode = true;
  $$unsubscribe_page();
  return `<div class="flex flex-col min-h-screen "><div class="flex flex-col flex-grow w-full px-4 py-2"><header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8"><a class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400" href="/">${escape(name)}</a>

      <button type="button" role="switch" aria-label="Toggle Dark Mode"${add_attribute("aria-checked", isDarkMode, 0)} class="w-5 h-5 sm:h-8 sm:w-8 sm:p-1">${validate_component(MoonIcon, "MoonIcon").$$render($$result, { class: "hidden text-zinc-500 dark:block" }, {}, {})}
        ${validate_component(SunIcon, "SunIcon").$$render($$result, { class: "block text-zinc-400 dark:hidden" }, {}, {})}</button></header>
    <main class="${[
    "flex flex-col flex-grow w-full mx-auto",
    !$page.data.layout?.fullWidth ? "max-w-2xl" : ""
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</main></div></div>`;
});
export {
  Layout as default
};
