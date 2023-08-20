

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.952e1d08.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/stores.c79e42f6.js","_app/immutable/chunks/singletons.606a3f57.js"];
export const stylesheets = [];
export const fonts = [];
