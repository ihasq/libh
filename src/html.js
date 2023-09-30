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
						const typeMap = CORE.getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER.proxyHandleTemplate)));
						const resultBuffer = KEYS[keyIndex](typeMap);
						resultBuffer.onclick();
						console.log(typeMap);
					};
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
						BUFFER.portConfig.global = CORE.getDeepCopy(BUFFER.portConfig.global);
					};
					if(("prop" in BUFFER.portConfig)) {
						throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved")
					};
					BUFFER.portConfig.onclick(BUFFER.portConfig)
					console.log(BUFFER.portConfig)
					break;

				default:
					BUFFER.keyMap += KEYS[keyIndex]

			};
		};
	};
};

function html(STRINGS, ...KEYS) {
	const INSTANCE_UUID = window.crypto.randomUUID();
	const RENDER_TARGET_UUID = window.crypto.randomUUID();
	const HTML_INSTANCE = Object.assign(new String("<span id=" + RENDER_TARGET_UUID + " hidden></span>"), {
		LIBH_FLAG: true,
		getAsNode() {
			const RETURN_NODE = document.createElement("span");
			RETURN_NODE.innerText = Date.now()
			return RETURN_NODE;
		}
	});
	createHTMLInstance(window.crypto.randomUUID(), STRINGS, KEYS);
	setTimeout(() => {
		const TARGET = document.getElementById(RENDER_TARGET_UUID);
		if(!TARGET) {
			// instance creation process
			console.log(`instance created: ${INSTANCE_UUID}`);
		} else {
			// appending process
			console.log("html appended");
			TARGET.replaceWith(Date.now());
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

/*
 * 	krmbn0576 さんに感謝します: Qiita記事「JavaScriptのフックパターンの楽な書き方」
 * 	https://qiita.com/krmbn0576/items/473e18e182972b41dd1b
 */

function hook(BASE_CLASS, TARGET, ADDITION) {
	if (BASE_CLASS.prototype[TARGET]) BASE_CLASS = BASE_CLASS.prototype;
	else if (!BASE_CLASS[TARGET]) throw new Error('Cannot find hook');
	const ORIGIN = BASE_CLASS[TARGET];
	BASE_CLASS[TARGET] = function() {
		arguments[arguments.length] = ORIGIN;
		arguments.length++;
		return ADDITION.apply(this, arguments);
	};
};

hook(Element, "appendChild", function() {
	arguments[arguments.length - 1].apply(
		this,
		(arguments[0].LIBH_FLAG)? [arguments[0].getAsNode()] : arguments
	);
});

export { html };