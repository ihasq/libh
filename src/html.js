import * as CORE from "./core.js";
import { parse } from "../node_modules/acorn/dist/acorn.mjs";

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

/**
 * 
 * @param { Function } fnBody 
 * @returns {}
 * 
 */

// const MY_HANDLE = {
// 	get: function(target, prop) {
// 		if(!(prop in target)) {
// 			target[prop] = new Proxy({}, this)
// 		}
// 	}
// };

function functionParser(INSTANCE_ID, fnBody) {

	const TEMPLATE_STRING = "" + fnBody; // === toString()
	const FUNC_AST = parse(TEMPLATE_STRING)
	console.log(FUNC_AST)
	// const FUNC_TYPE = ((!fnBody.hasOwnProperty("prototype"))&&(!fnBody.name))? "arrow" : "normal";
	// let FUNC_ARG = "";
	// let FUNC_NAME;
	// switch(FUNC_TYPE) {
	// 	case "arrow":
	// 		FUNC_ARG = TEMPLATE_STRING.slice(0, TEMPLATE_STRING.indexOf("=>")).replace(/ |\(|\)/g, "").split(",");
	// 		break;
	// 	default:
	// 		if(fnBody.name) {
	// 			FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf(`function ${fnBody.name? fnBody.name: ""}(`, TEMPLATE_STRING.indexOf(`)`)));
	// 		} else {

	// 		}
	// 		FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf("function"));
	// 		FUNC_NAME = fnBody.name;
	// };
	// const REF_COLLECTION = TEMPLATE_STRING.match(new RegExp(FUNC_ARG[0].replace(/\$/g, "\\$") + `(\\.[a-zA-Z0-9_$].*|\\[("(.*)"|'(.*)'|\`(.*)\`)\\])+`, "g"));
	// console.log(REF_COLLECTION);

	// console.log(FUNC_ARG);

	return {
		TEMPLATE_STRING,
		// FUNC_TYPE
	}
};

/**
 * 
 * @param { String } INSTANCE_ID
 * @param { String[] } STRINGS 
 * @param { Function[] } KEYS 
 * 
 */

function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {

	const BUFFER = {
		keyMap: "",
		funcList: [],
	};

	for(let index = 0; index < STRINGS.length; index++) {
		BUFFER.keyMap += encodeURI(STRINGS[index]);
		if(index + 1 !== STRINGS.length) {
			switch(typeof KEYS[index]) {
				case "function":
					BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
					if(KEYS[index].constructor.name !== "Function") {
						throw new Error("Can not use async function");
					} else {
						BUFFER.funcList.push(functionParser(INSTANCE_ID, KEYS[index]));
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
					BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
					break;
				default:
					BUFFER.keyMap += KEYS[index]

			};
		}
	};
	BUFFER.keyMap = decodeURI(BUFFER.keyMap)
	console.log(BUFFER.keyMap);
	const SELECTOR = new RegExp(` \\$\\{${INSTANCE_ID}:[0-9]\\} `, "g");
	const TEMPLATE = PARSE_BUFFER.HTMLParser.parseFromString(
		BUFFER.keyMap.slice(BUFFER.keyMap.indexOf("{") + 1, BUFFER.keyMap.lastIndexOf("}")),
		"text/html"
	).body;
	console.dir(TEMPLATE.children);
	// for(let index = 0; index < TEMPLATE.childNodes)
	PARSE_BUFFER.registry[INSTANCE_ID] = Object.assign(BUFFER, {
		instanceId: INSTANCE_ID,
		keys: {

		}
	});
};

function html(STRINGS, ...KEYS) {
	const INSTANCE_UUID = window.crypto.randomUUID();
	const RENDER_TARGET_UUID = window.crypto.randomUUID();
	const HTML_INSTANCE = Object.assign(new String("<span id=" + RENDER_TARGET_UUID + " hidden></span>"), {
		LIBH_UUID: INSTANCE_UUID,
	});
	setTimeout(() => {
		const TARGET = document.getElementById(RENDER_TARGET_UUID);
		if(!TARGET) {
			// instance creation process
			console.log(`instance created: ${INSTANCE_UUID}`);
		} else {
			// appending process
			console.log("html appended");
			const APPEND_TARGET = TARGET.parentElement;
			TARGET.remove();
			createHTMLInstance(window.crypto.randomUUID(), STRINGS, KEYS);
		};
	}, 0);
	return HTML_INSTANCE;
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