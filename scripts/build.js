import esbuild from "esbuild";
import fs from "node:fs";

const RELEASE_VERSION = "0.0.17";

[
	{
		minify: false,
		outfile: `./build/libh.js`,
		outExtension: {
			".js": ".mjs"
		},
		platform: "node",
		format: "cjs",
		target: "node14",
	},

	{
		minify: true,
		outfile: `./build/libh.min.js`,
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		target: "chrome58",
	},

	{
		minify: false,
		outfile: `./build/libh.cjs`,
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "cjs",
		target: "chrome58",
	},

	{
		minify: false,
		outfile: `./build/libh.esm.js`,
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "esm",
		target: "chrome58",
	},

	{
		minify: true,
		outfile: `./build/libh.esm.min.js`,
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "esm",
		target: "chrome58",
	}

].forEach(async CONFIG => {

	await esbuild.build(Object.assign(CONFIG, {
		treeShaking: true,
		bundle: true,
		entryPoints: [`./src/libh.js`],
	}));

});

["quick-start", "component"].forEach((EXAMPLE_NAME) => {
	fs.writeFileSync(
		`./examples/${EXAMPLE_NAME}/package.json`,
		`{
		    "name": "libh-example-${EXAMPLE_NAME}",
		    "version": "${RELEASE_VERSION}",
		    "license": "MIT",
		    "dependencies": {
		        "libh": "^${RELEASE_VERSION}"
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