import { core } from "./core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
*/

function html(strings, ...keys) {
	// workflow[1]
	for(let i = 0; i < keys.length; i++) {
		if((typeof keys[i]) === "function") {
			const registry = Object.create(null);
			/*
				registry = {
					tempFnString: "$ => ({...})" | "function($) { return ... }"
					tempFnType: "arrow" | "standard",
					tempFnArg: "$" or what else
					tempHandleMap: {
						count: 0
					}
				}
			*/
			registry.templateString = keys[i].toString();

			core.functionRegistry[core.functionRegistryLength] = {
				templateString: keys[i].toString(),
			};
			core.functionRegistryLength++;
		} else if((typeof keys[i]) === "object") {

		} else {

		}
	}
};

html.attribute = {
	define: function(init) {
		for(const index in init) {
			console.log(index);
		}
	},
};

export { html }