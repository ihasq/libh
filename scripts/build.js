import esbuild from "esbuild";


[
	"libh",
	"libh-html",
	"libh-css",
	"libh-scss",
	"libh-sass"
].forEach((pkgName, pkgIndex) => {
	[

		//	libh.js
		{
			minify: false,
			outfile: `./packages/${pkgName}/lib.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "node",
			format: "cjs",
			target: "node14",
		},
	
		//	libh.min.js
		{
			minify: true,
			outfile: `./packages/${pkgName}/lib.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			target: "chrome58",
		},
	
		//	libh.cjs
		{
			minify: false,
			outfile: `./packages/${pkgName}/lib.cjs`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "cjs",
			target: "chrome58",
		},
	
		//	libh.esm.js
		{
			minify: false,
			outfile: `./packages/${pkgName}/lib.esm.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "esm",
			target: "chrome58",
		},
	
		//	libh.esm.min.js
		{
			minify: true,
			outfile: `./packages/${pkgName}/lib.esm.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "esm",
			target: "chrome58",
		}
	
	].forEach(async index => {
	
		await esbuild.build(Object.assign(index, {
			bundle: true,
			entryPoints: [`./src/${(pkgIndex === 0)? pkgName : pkgName.slice(5)}.js`],
		}))
	
	});
})
