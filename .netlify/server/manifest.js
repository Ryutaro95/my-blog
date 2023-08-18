export const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.0a9988bd.js","app":"_app/immutable/entry/app.e2788ab6.js","imports":["_app/immutable/entry/start.0a9988bd.js","_app/immutable/chunks/index.40ef7fde.js","_app/immutable/chunks/singletons.a0cc8ed9.js","_app/immutable/entry/app.e2788ab6.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.40ef7fde.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
