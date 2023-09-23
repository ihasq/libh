import esbuild from "esbuild";
import fs from "node:fs";


[ "libh", "libh-html" ].forEach((pkgName, pkgIndex) => {
	[
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

		{
			minify: true,
			outfile: `./packages/${pkgName}/${pkgName}.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			target: "chrome58",
		},

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
		}));
	
	});
	fs.writeFileSync(
		`./packages/${pkgName}/package.json`,
		`{
		    "name": "${pkgName}",
		    "version": "0.0.10",
		    "description": "html in javascript",
		    "type": "module",
		    "main": "./${pkgName}.esm.min.js",
		    "repository": {
		        "type": "git",
		        "url": "git+https://github.com/ihasq/libh.git"
		    },
		    "author": "ihasq",
		    "license": "MIT",
		    "bugs": {
		        "url": "https://github.com/ihasq/libh/issues"
		    },
		    "homepage": "https://github.com/ihasq/libh#readme"
		}`.replace(/\t/g, "").replace(/    /g, "\t")
	)
})