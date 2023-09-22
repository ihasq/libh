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
		format: "cjs",
		target: "node14",
	},

	//	libh.min.js
	{
		minify: true,
		outfile: "./build/libh.min.js",
		outExtension: {
			".js": ".mjs"
		},
		platform: "browser",
		target: "chrome58",
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
		target: "chrome58",
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
		target: "chrome58",
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
		target: "chrome58",
	}

].forEach(async index => {

	await esbuild.build(Object.assign(index, {
		bundle: true,
		entryPoints: ["./src/libh.js"],
	}))

});