import * as universal from '../entries/pages/post/_slug_/_page.js';
import * as server from '../entries/pages/post/_slug_/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/post/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/post/[slug]/+page.js";
export { server };
export const server_id = "src/routes/post/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/3.ec5eb090.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/info.b44f65da.js","_app/immutable/chunks/PostDate.c8fe5bd4.js","_app/immutable/chunks/ArrowLeftIcon.752fe0ae.js","_app/immutable/chunks/SocialLinks.1d658343.js","_app/immutable/chunks/singletons.606a3f57.js"];
export const stylesheets = ["_app/immutable/assets/3.3805f4c7.css"];
export const fonts = [];
