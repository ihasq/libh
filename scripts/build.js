// import esbuild from "esbuild";
import fs from "node:fs";

// const RELEASE_VERSION = "0.0.10";

// ["libh", "libh-core"].forEach((PKG_NAME, PKG_INDEX) => {
// 	[
// 		{
// 			minify: false,
// 			outfile: `./${PKG_NAME}/build/${PKG_NAME}.js`,
// 			outExtension: {
// 				".js": ".mjs"
// 			},
// 			platform: "node",
// 			format: "cjs",
// 			target: "node14",
// 		},

// 		{
// 			minify: true,
// 			outfile: `./${PKG_NAME}/build/${PKG_NAME}.min.js`,
// 			outExtension: {
// 				".js": ".mjs"
// 			},
// 			platform: "browser",
// 			target: "chrome58",
// 		},

// 		{
// 			minify: false,
// 			outfile: `./${PKG_NAME}/build/${PKG_NAME}.cjs`,
// 			outExtension: {
// 				".js": ".mjs"
// 			},
// 			platform: "browser",
// 			format: "cjs",
// 			target: "chrome58",
// 		},

// 		{
// 			minify: false,
// 			outfile: `./${PKG_NAME}/build/${PKG_NAME}.esm.js`,
// 			outExtension: {
// 				".js": ".mjs"
// 			},
// 			platform: "browser",
// 			format: "esm",
// 			target: "chrome58",
// 		},

// 		{
// 			minify: true,
// 			outfile: `./${PKG_NAME}/build/${PKG_NAME}.esm.min.js`,
// 			outExtension: {
// 				".js": ".mjs"
// 			},
// 			platform: "browser",
// 			format: "esm",
// 			target: "chrome58",
// 		}

// 	].forEach(async CONFIG => {
	
// 		await esbuild.build(Object.assign(CONFIG, {
// 			bundle: false,
// 			entryPoints: [`./src/libh.js`],
// 		}));
	
// 	});
// 	fs.writeFileSync(
// 		`./${PKG_NAME}/build/package.json`,
// 		`{
// 		    "name": "${PKG_NAME}",
// 		    "version": "${RELEASE_VERSION}",
// 		    "description": "html in javascript",
// 		    "type": "module",
// 		    "main": "./${PKG_NAME}.esm.min.js",
// 		    "repository": {
// 		        "type": "git",
// 		        "url": "git+https://github.com/ihasq/libh.git"
// 		    },
// 		    "author": "ihasq",
// 		    "license": "MIT",
// 		    "bugs": {
// 		        "url": "https://github.com/ihasq/libh/issues"
// 		    },
// 		    "homepage": "https://github.com/ihasq/libh#readme"${(PKG_NAME === "libh")? `,
// 		    "dependencies": {
// 		        "libh-core": "^${RELEASE_VERSION}"
// 		    }` : ""}
// 		}`.replace(/\t/g, "").replace(/    /g, "\t")
// 	);
// });



["quick-start", "component"].forEach((EXAMPLE_NAME) => {
	fs.writeFileSync(
		`./examples/${EXAMPLE_NAME}/package.json`,
		`{
		    "name": "libh-example-${EXAMPLE_NAME}",
		    "version": "${RELEASE_VERSION}",
		    "license": "MIT",
		    "dependencies": {
		        "libh-html": "^${RELEASE_VERSION}"
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