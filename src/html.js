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

let portRegistry = null;

/**
 * 
 * @param { object } objectData 
 * @returns { object }
 */

function getObjectTypeMap(objectData) {
	const KEY_DATA = Object.keys(objectData);
	const RETURN_BUFFER = Object.create(null);
	for(let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
		RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = (
			(typeof objectData[KEY_DATA[objectKeyIndex]] === "object")? getObjectTypeMap(objectData[KEY_DATA[objectKeyIndex]]) : typeof objectData[KEY_DATA[objectKeyIndex]]
		)
	};
	return RETURN_BUFFER;
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
		portConfig: Object.create(null),
		proxyRegistry: Object.create(null),
		proxyHandleTemplate: {
			get(target, prop) {
				console.dir(target)
				if(prop in target) {
					console.log("already has");
					return target[prop]
				} else {
					const proxyRef = window.crypto.randomUUID();
					console.log("proxy created");
					target[prop] = Object.create(null)
					return new Proxy(target[prop], this);
				}
			},
			set(target, prop, value) {
				target[prop] = value
			},
		},
		elementProperty: {
			globalVariable: Object.create(null)
		}
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
						const proxyTest = KEYS[keyIndex](new Proxy({}, BUFFER.proxyHandleTemplate))
						const typeMap = getObjectTypeMap(proxyTest);
						console.log(typeMap)
						// console.log(buffer.style["*"])
						// console.dir(buffer.hook.avatarURL)
						// console.dir(buffer.hook.avatarURL)
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
					BUFFER.portConfig = KEYS[keyIndex];
					if(global in BUFFER.portConfig) {
						BUFFER.elementProperty.globalVariable = global
					}
					break;

				default:
					BUFFER.keyMap += KEYS[keyIndex]

			};
		}
	};

	// configuring element

	// const CONFIG_KEY_DATA = getObjectTypeMap(BUFFER.portConfig);
	// const STD_TEMPLATE = {
	// 	useProp: () => {
	// 		const RETURN_BUFFER = Object.create(null);
	// 		return RETURN_BUFFER
	// 	}
	// };

	// Object.assign(BUFFER.portConfig, STD_TEMPLATE);

	// console.log(CONFIG_KEY_DATA);

	// BUFFER.keyMap = decodeURI(BUFFER.keyMap)
	// console.log(BUFFER.keyMap);
	// const SELECTOR = new RegExp(` \\$\\{${INSTANCE_ID}:[0-9]\\} `, "g");
	// const TEMPLATE = PARSE_BUFFER.HTMLParser.parseFromString(
	// 	BUFFER.keyMap.slice(BUFFER.keyMap.indexOf("{") + 1, BUFFER.keyMap.lastIndexOf("}")),
	// 	"text/html"
	// ).body;
	// console.dir(TEMPLATE.children);
	// // for(let index = 0; index < TEMPLATE.childNodes)
	// PARSE_BUFFER.registry[INSTANCE_ID] = Object.assign(BUFFER, {
	// 	instanceId: INSTANCE_ID,
	// 	keys: {

	// 	}
	// });
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