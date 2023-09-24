import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

export default {
	output: {
		file: "./"
	},
	plugins: [
		excludeDependenciesFromBundle({
			dependencies: true
		}),
	]
};