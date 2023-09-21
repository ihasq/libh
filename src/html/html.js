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

function createHTMLInstance(id, stringCollection, keys) {
	let keyMap = "", keyRegistry = Object.create(null);
	stringCollection.forEach((string, index) => {
		keyMap += string + ((index + 1 !== stringCollection.length)? ` \${${id}:${index}} ` : "")
	});
	console.log(keyMap);
	const SELECTOR = new RegExp(` \\$\\{${id}:[0-9]{6}\\} `, "g");
	const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
		keyMap.slice(keyMap.indexOf("{") + 1, keyMap.lastIndexOf("}")),
		"text/html"
	).body;
	console.log(TEMPLATE);

	for(const key of keys) {
		switch(typeof key) {
			case "function":
				if(key.constructor.name === (
					"GeneratorFunction" || "AsyncFunction" || "AsyncGeneratorFunction"
				)) {
					throw new Error("Can not use async function")
				};
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
				break;
			case "object":
				throw new Error("dumb ass");
				break;
			default:
		};
	};
	parseBuffer.registry[id] = {
		keyMap
	};
};

function html(strings, ...keys) {
	return createHTMLInstance(core.generateKeyIdentifier(), strings, keys);
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