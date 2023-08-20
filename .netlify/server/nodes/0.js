import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.d566122b.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/info.b44f65da.js","_app/immutable/chunks/stores.c79e42f6.js","_app/immutable/chunks/singletons.606a3f57.js"];
export const stylesheets = ["_app/immutable/assets/0.0f2b312e.css"];
export const fonts = [];
