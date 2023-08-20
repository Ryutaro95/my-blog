import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.21ea4c4c.js","app":"_app/immutable/entry/app.7fc11573.js","imports":["_app/immutable/entry/start.21ea4c4c.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/singletons.606a3f57.js","_app/immutable/entry/app.7fc11573.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.40ef7fde.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
