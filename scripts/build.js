import esbuild from "esbuild";

[

	//	libh.js
	{
		minify: false,
		outfile: "./build/libh.js",
		outExtension: {
			".js": ".mjs"
		},
		platform: "node",
		format: "cjs"
	},

	//	libh.min.js
	{
		minify: true,
		outfile: "./build/libh.min.js",
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
	},

	//	libh.cjs
	{
		minify: false,
		outfile: "./build/libh.cjs",
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "cjs",
	},

	//	libh.esm.js
	{
		minify: false,
		outfile: "./build/libh.esm.js",
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "esm",	
	},

	//	libh.esm.min.js
	{
		minify: true,
		outfile: "./build/libh.esm.min.js",
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		format: "esm",	
	}

].forEach(async index => await esbuild.build(Object.assign(index,
	{
		bundle: true,
		entryPoints: ["./src/libh.js"],
	}
)))