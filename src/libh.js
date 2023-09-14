import { core } from "./core.js";

import { html } from "./html.js";

const sass = function() {};

sass.test = "a";

const config = function(init) {
	core.config = init;
	if(init.sweep) {
		document.querySelectorAll("script").forEach(element => {
			element.remove();
		})
	};
	Object.freeze(libh);
};

const attribute = {
	define: function(init) {

	},
	bind: function(className) {
		
	}
};

const testAPI = function(strings, ...keys) {
	return core.constructorTest(strings, ...keys)
};

/**
 * @param { querySelectorString } selector 
 */


const select = function(selector) {
	if(!!selector.isLibhElement && !!core.elementRegistry[selector.libhIdentifier]) {

	}
};

const docs = function() {

}

docs.test = "aa";


Number.prototype.call = function() {
	console.log(this)
}


const libh = Object.create(null);

Object.assign(libh, {
	html,
	sass,
	attribute,
	select,
	render,
	config,
});

export default libh