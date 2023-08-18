import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.6e75ee7b.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/info.0a4752c1.js","_app/immutable/chunks/stores.c8e4db66.js","_app/immutable/chunks/singletons.a0cc8ed9.js"];
export const stylesheets = ["_app/immutable/assets/0.832fe598.css"];
export const fonts = [];
