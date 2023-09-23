import esbuild from "esbuild";
import fs from "node:fs";

const CURRENT_VERSION = "0.0.10";

[ "libh", "libh-html" ].forEach((PKG_NAME, PKG_INDEX) => {
	[
		{
			minify: false,
			outfile: `./packages/${PKG_NAME}/${PKG_NAME}.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "node",
			format: "cjs",
			target: "node14",
		},

		{
			minify: true,
			outfile: `./packages/${PKG_NAME}/${PKG_NAME}.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			target: "chrome58",
		},

		{
			minify: false,
			outfile: `./packages/${PKG_NAME}/${PKG_NAME}.cjs`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "cjs",
			target: "chrome58",
		},

		{
			minify: false,
			outfile: `./packages/${PKG_NAME}/${PKG_NAME}.esm.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "esm",
			target: "chrome58",
		},

		{
			minify: true,
			outfile: `./packages/${PKG_NAME}/${PKG_NAME}.esm.min.js`,
			outExtension: {
				".js": ".mjs"
			},
			platform: "browser",
			format: "esm",
			target: "chrome58",
		}

	].forEach(async CONFIG => {
	
		await esbuild.build(Object.assign(CONFIG, {
			bundle: true,
			entryPoints: [`./src/${(PKG_INDEX === 0)? PKG_NAME : PKG_NAME.slice(5)}.js`],
		}));
	
	});
	fs.writeFileSync(
		`./packages/${PKG_NAME}/package.json`,
		`{
		    "name": "${PKG_NAME}",
		    "version": "${CURRENT_VERSION}",
		    "description": "html in javascript",
		    "type": "module",
		    "main": "./${PKG_NAME}.esm.min.js",
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
	);
});

["quick-start", "component"].forEach((EXAMPLE_NAME) => {
	fs.writeFileSync(
		`./examples/${EXAMPLE_NAME}/package.json`,
		`{
		    "name": "libh-example-${EXAMPLE_NAME}",
		    "version": "${CURRENT_VERSION}",
		    "license": "MIT",
		    "dependencies": {
		        "libh-html": "^${CURRENT_VERSION}"
		    },
		    "devDependencies": {
		        "vite": "^3.0.1"
		    },
		    "stackblitz": {
		        "startCommand": "vite"
		    }
		}`.replace(/\t/g, "").replace(/    /g, "\t")
	)
});