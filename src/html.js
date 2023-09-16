import { core } from "./core.js"

const html = function(strings, ...keys) {
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

html.prototype = undefined

export { html }