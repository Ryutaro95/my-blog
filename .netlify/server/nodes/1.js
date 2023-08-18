

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.74c30580.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/stores.c8e4db66.js","_app/immutable/chunks/singletons.a0cc8ed9.js"];
export const stylesheets = [];
export const fonts = [];
