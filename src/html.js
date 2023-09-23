import * as core from "./core.js";

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

function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {

	const BUFFER = {
		keyMap: "",
		funcList: [],
	};

	for(let index = 0; index < STRINGS.length; index++) {
		BUFFER.keyMap += STRINGS[index];
		if(index + 1 !== STRINGS.length) {
			BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
			switch(typeof KEYS[index]) {
				case "function":
					if(KEYS[index].constructor.name !== "Function") {
						throw new Error("Can not use async function");
					} else {
						BUFFER.funcList.push(functionParser(KEYS[index]));
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

function html(strings, ...keys) {
	const IDENTIFIER_UUID = core.getStaticUUID();
	const HTML_INSTANCE = new String("<span id=" + IDENTIFIER_UUID + "></span>");
	HTML_INSTANCE.libh = {
		struct
	};
	setTimeout(() => {
		const TARGET = document.getElementById(IDENTIFIER_UUID);
		if(!TARGET) {
			// instance created
			console.log("instance created");
		} else {
			// appended in html
			console.log("html appended");
			createHTMLInstance(core.getStaticUUID(), strings, keys);
		}
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