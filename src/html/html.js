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

function createHTMLInstance(instanceId, stringCollection, keyCollection) {
	let keyMap = "", keyRegistry = Object.create(null);

	for(let index = 0; index < stringCollection.length; index++) {
		keyMap += stringCollection[index];
		if(index + 1 !== stringCollection.length) {
			keyMap += ` \${${instanceId}:${index}} `;
			switch(typeof keyCollection[index]) {
				case "function":
					if(keyCollection[index].constructor.name === (
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
				default:
			};
		}
	};
	
	console.log(keyMap);
	const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]{6}\\} `, "g");
	const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
		keyMap.slice(keyMap.indexOf("{") + 1, keyMap.lastIndexOf("}")),
		"text/html"
	).body;
	console.log(TEMPLATE);
	parseBuffer.registry[instanceId] = {
		keyMap
	};
};

function html(strings, ...keys) {
	return createHTMLInstance(core.generateInstanceId(), strings, keys);
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