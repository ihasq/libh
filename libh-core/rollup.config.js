import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import terser from '@rollup/plugin-terser';

export default {
	input: "./src/libh-core.js",
	output: {
		file: "./build/libh-core.esm.js",
		compact: true,
	},
	plugins: [
		excludeDependenciesFromBundle({
			dependencies: true
		}),
		terser()
	]
};