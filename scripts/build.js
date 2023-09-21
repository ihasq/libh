import esbuild from "esbuild";

await esbuild.build({
	bundle: true,
	minify: true,
	entryPoints: ["./src/libh.js"],
	outfile: "./build/libh.js",
	outExtension: {
		".js": ".mjs"
	},
	platform: "browser",
	format: "esm",
})