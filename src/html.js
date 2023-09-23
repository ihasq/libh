import * as core from "./core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string. search where the key relates to (attribute or textNode)
	2. parse function
*/

const PARSE_BUFFER = {
	registry: Object.create(null),
	HTMLParser: new DOMParser(),
};

function functionParser(fnBody) {

	const TEMPLATE_STRING = "" + fnBody; // === toString()
	const FUNC_TYPE = fnBody.hasOwnProperty("prototype")? "normal" : fnBody.name? "normal" : "arrow";
	let FUNC_ARG = "";
	let FUNC_NAME;
	if(FUNC_TYPE === "normal") {
		if(fnBody.name) {
			FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf(`function ${fnBody.name}`));
		} else {

		}
		FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf("function"));
		FUNC_NAME = fnBody.name;
	} else {

	}

	console.log(FUNC_NAME);
	return {
		TEMPLATE_STRING,
		FUNC_TYPE
	}
};

function createHTMLInstance(instanceId, strings, keys) {

	const BUFFER = {
		keyMap: "",
		funcList: [],
	};

	for(let index = 0; index < strings.length; index++) {
		BUFFER.keyMap += strings[index];
		if(index + 1 !== strings.length) {
			BUFFER.keyMap += ` \${${instanceId}:${index}} `;
			switch(typeof keys[index]) {
				case "function":
					if(keys[index].constructor.name !== "Function") {
						throw new Error("Can not use async function");
					} else {
						BUFFER.funcList.push(functionParser(keys[index]));
						console.log(BUFFER.funcList[index].TEMPLATE_STRING);
					}
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
					throw new Error("not yet");
				default:
			};
		}
	};
	
	console.log(BUFFER.keyMap);
	const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]\\} `, "g");
	const TEMPLATE = PARSE_BUFFER.HTMLParser.parseFromString(
		BUFFER.keyMap.slice(BUFFER.keyMap.indexOf("{") + 1, BUFFER.keyMap.lastIndexOf("}")),
		"text/html"
	).body;
	console.dir(TEMPLATE.children);
	// for(let index = 0; index < TEMPLATE.childNodes)
	PARSE_BUFFER.registry[instanceId] = Object.assign(BUFFER, {
		instanceId,
		keys: {

		}
	});
};

function html(strings, ...keys) {
	createHTMLInstance(crypto.randomUUID(), strings, keys);
	return;
};

html.getReservedKey = [
	"global",
	"shared",
	"prop",
	"this",
	"static",
	"method",
	"meta",
	"event",
	"onclick",
	"onchange"
];

export { html };