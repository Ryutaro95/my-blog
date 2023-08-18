import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.699f7ba0.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/PostsList.536a76cf.js","_app/immutable/chunks/PostDate.c8fe5bd4.js","_app/immutable/chunks/SocialLinks.6098ec75.js","_app/immutable/chunks/info.0a4752c1.js"];
export const stylesheets = ["_app/immutable/assets/PostsList.988031de.css"];
export const fonts = [];
