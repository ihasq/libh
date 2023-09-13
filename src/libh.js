import { html } from "./std/html.js"

const core = {
	elementRegistry: Object.create(null),
	portRegistry: [
	/*
		{
			
		}
	 */
	],
	functionRegistry: [],
	DOMParser: new DOMParser(),
	stringCache: {},
	placeholderCache: [],
	keyCache: Object.create(null),
	funcCache: Object.create(null),

	init(str, ...key) {
		// parse string

		if(typeof key[0] === "function") {
			const funcStr = key[0].toString();
			const funcInfo = {
				body: funcStr.match(),
			}
			// parse function
			let objectRoot = {
				this: {
					_count: 0,
					style: {
						"*": {
							color: "red"
						}
					},
					src: "app.com"
				},
				prop: {
					"hx-swap": {
						avatarURL: "google.png"
					}
				}
			}
			const funcPrototype = key[0](objectRoot);
			console.log(funcPrototype);
			return funcPrototype;
		} else if(typeof key[0] === "function") {
			console.log(key[0]);
			return {};
		}
	},

	config: {},
	compile: {},
	property: {
		version: "0.0.1"
	},
	state: {
		isRunning: false,
	},
	renderTask: [],
	createPortRegistry: function() {

	},

};

const libh = function(strings, ...keys) {
	return core.init(strings, ...keys);
};

/**
 * @param { init } init 
 */

libh.config = function(init) {
	core.config = init;
	if(init.sweep) {
		document.querySelectorAll("script").forEach(element => {
			element.remove();
		})
	};
	Object.freeze(libh);
};

libh.attribute = {
	define: function(className, init) {

	},
	bind: function(className) {
		
	}
};

/**
 * @param { string } selector 
 */

libh.select = function(selector) {
	if(!!selector.isLibhElement && !!core.elementRegistry[selector.libhIdentifier]) {

	}
};

libh.class = {

};

const html = function(strings, ...keys){
	return core.init(strings, ...keys);
};

html.render = "app";

const docs = function() {

}

docs.test = "aa";

const sass = function() {};

sass.test = "a";

Object.assign(libh, {
	html: html,
	docs: docs,
	sass: sass,
})

libh.render = function(LibhElementPort) {
	if(!core.state.isRunning) {
		// renderer setup
		core.state.isRunning = true;
	};
	const portString = LibhElementPort.toString();
	const portRefArg = (portString)
	portString.split()
};

Number.prototype.call = function() {
	console.log(this)
}

export { libh };