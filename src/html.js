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

let portRegistry = null;

class LibhReferenceObject {
	constructor() {

	}
};

/**
 * 
 * @param { object } objectData 
 * @returns { object }
 */


Number.prototype.valueOf = function() {
	console.log("get value")
	return this
}


// class LibhNumber {
// 	constructor() {
// 	};
// 	valueOf() {
// 		return 0
// 	}
// }

// let test = new LibhNumber();
// test++
// console.log(test)

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
			globalVariable: Object.create(null),
			propReference: null,
		},
		portProperty: {
			
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
						const typeMap = CORE.getDeepCopy(proxyTest);
						const resultBuffer = KEYS[keyIndex](typeMap);
						resultBuffer.onclick();
						console.log(typeMap);
					}
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
					if("global" in BUFFER.portConfig) {
						BUFFER.elementProperty.globalVariable = CORE.getDeepCopy(BUFFER.portConfig.global);
					};
					if(("prop" in BUFFER.portConfig)) {
						throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved")
					};

					console.log(BUFFER.elementProperty.globalVariable)
					break;

				default:
					BUFFER.keyMap += KEYS[keyIndex]

			};
		}
	};
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