import * as CORE from "./core.js";

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

const portRegistry = {

}

const MY_HANDLE = {
	get(target, prop) {
		if(!(prop in target)) {
			console.log("created")
			return new Proxy({}, this)
		} else {
			console.log("already has")
			return target[prop]
		}
	},
	handlerRegistry: []
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

	for(let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
		BUFFER.keyMap += encodeURI(STRINGS[keyIndex]);
		if(keyIndex + 1 !== STRINGS.length) {
			switch(typeof KEYS[keyIndex]) {
				case "function":
					if(KEYS[keyIndex].constructor.name !== "Function") {
						BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
						throw new Error("Can not use async function");
					} else {
						const buffer = KEYS[keyIndex](new Proxy({}, MY_HANDLE));
						console.dir(buffer.hook)
						console.dir(buffer.hook.avatarURL)
						// BUFFER.funcList.push(functionParser(INSTANCE_ID, KEYS[keyIndex]));
						// console.log(BUFFER.funcList[keyIndex].TEMPLATE_STRING);
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
					// function checkObjectKey(objRef) {
					// 	const OBJ_STACK = Object.create(null);
					// 	for(let objIndex = 0; objIndex < Object.keys(OBJ_STACK).length; objIndex++) {
					// 		if(OBJ_STACK)
					// 	}
					// };
					BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
					break;

				default:
					BUFFER.keyMap += KEYS[keyIndex]

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