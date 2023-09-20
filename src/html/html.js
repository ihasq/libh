import * as core from "../core/core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string. search where the key relates to (attribute or textNode)
	2. parse function
*/

const parseBuffer = {
	registry: Object.create(null),
	HTMLParser: new DOMParser(),
};

function createHTMLInstance(id, strings, keys) {
	let keyMap = "", keyRegistry = Object.create(null);
	for(let i = 0; i < strings.length; i++) {
		keyMap += strings[i] + " " + ((i + 1 !== strings.length)? `\${${id}:${"0".repeat(6 - ("" + i).length) + i}}` : "") + " "
	};
	const SELECTOR = new RegExp(` \\$\\{${id}:[0-9]{6}\\} `, "g");
	console.log(keyMap);
	const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
		keyMap.slice(keyMap.indexOf("{") + 1, keyMap.lastIndexOf("}")),
		"text/html"
	).body;

	for(let i = 0; i < keys.length; i++) {
		if(typeof keys[i] === "function") {
			console.dir(keys[i].constructor.name);
		} else {
			throw new Error("dumb ass");
		}
	};
	parseBuffer.registry[id] = {
		keyMap
	};
};

function html(strings, ...keys) {
	createHTMLInstance(core.generateKeyIdentifier(), strings, keys);
	for(let i = 0; i < keys.length; i++) {
		if((typeof keys[i]) === "function") {
			// if(keys[i].constructor.name === ("AsyncFunction" || "AsyncGeneratorFunction")) {
			// 	throw new Error("Can not use async function")
			// }
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
		} else if((typeof keys[i]) === "object") {

		} else {

		}
	};
	// reset buffer
};

html.getReservedKey = [
	"shared",
	"prop",
	"this",
	"static",
	"method",
	"meta"
]

export { html }