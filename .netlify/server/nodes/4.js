import * as server from '../entries/pages/posts/__page__/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/__page__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/posts/[[page]]/+page.server.js";
export const imports = ["_app/immutable/nodes/4.80886a3c.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/info.0a4752c1.js","_app/immutable/chunks/ArrowLeftIcon.752fe0ae.js","_app/immutable/chunks/PostsList.536a76cf.js","_app/immutable/chunks/PostDate.c8fe5bd4.js"];
export const stylesheets = ["_app/immutable/assets/4.49288d19.css","_app/immutable/assets/PostsList.988031de.css"];
export const fonts = [];
