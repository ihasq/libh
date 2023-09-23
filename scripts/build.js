import esbuild from "esbuild";


[ "libh", "libh-html", "libh-css", "libh-scss", "libh-sass" ].forEach((pkgName, pkgIndex) => {
	[

		//	libh.js
		{
			minify: false,
			outfile: `./packages/${pkgName}/${pkgName}.js`,
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
			outfile: `./packages/${pkgName}/${pkgName}.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			target: "chrome58",
		},
	
		//	libh.cjs
		{
			minify: false,
			outfile: `./packages/${pkgName}/${pkgName}.cjs`,
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
			outfile: `./packages/${pkgName}/${pkgName}.esm.js`,
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
			outfile: `./packages/${pkgName}/${pkgName}.esm.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "esm",
			target: "chrome58",
		}
	
	].forEach(async config => {
	
		await esbuild.build(Object.assign(config, {
			bundle: true,
			entryPoints: [`./src/${(pkgIndex === 0)? pkgName : pkgName.slice(5)}.js`],
		}))
	
	});
})
