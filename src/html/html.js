import * as core from "../core/core.js"
import { TurboArray } from "../util/util.js";

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

function functionParser(fnBody) {
	const TEMPLATE_STRING = "" + fnBody; // === toString()
	const FUNC_TYPE = fnBody.hasOwnProperty("prototype")? "normal" : fnBody.name? "normal" : "arrow";
	console.log(FUNC_TYPE);
	return {
		TEMPLATE_STRING,
		FUNC_TYPE
	}
};

function createHTMLInstance(instanceId, strings, keys) {

	const buffer = {
		keyMap: "",
		funcList: new TurboArray(),
	};

	for(let index = 0; index < strings.length; index++) {
		buffer.keyMap += strings[index];
		if(index + 1 !== strings.length) {
			buffer.keyMap += ` \${${instanceId}:${index}} `;
			switch(typeof keys[index]) {
				case "function":
					if(keys[index].constructor.name !== "Function") {
						throw new Error("Can not use async function")
					} else {
						buffer.funcList.push(functionParser(keys[index]));
						console.log(buffer.funcList.at(index).TEMPLATE_STRING);
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
	
	console.log(buffer.keyMap);
	const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]\\} `, "g");
	const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
		buffer.keyMap.slice(buffer.keyMap.indexOf("{") + 1, buffer.keyMap.lastIndexOf("}")),
		"text/html"
	).body;
	console.dir(TEMPLATE.children);
	// for(let index = 0; index < TEMPLATE.childNodes)
	parseBuffer.registry[instanceId] = Object.assign(buffer, {
		instanceId,
		keys: {

		}
	});
};

function html(strings, ...keys) {
	createHTMLInstance(core.generateInstanceId(), strings, keys);
	return;
};

html.getReservedKey = [
	"shared",
	"prop",
	"this",
	"static",
	"method",
	"meta"
];

export { html };