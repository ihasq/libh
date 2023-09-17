import { core } from "./core.js"

function html(strings, ...keys) {
	for(let i = 0; i < keys.length; i++) {
		if((typeof keys[i]) === "function") {
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