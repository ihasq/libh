import * as CORE from "./core.js";

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

hook(Node, "appendChild", function() {
	arguments[arguments.length - 1].apply(
		this, (arguments[0].LIBH_STATIC.FLAG)? [arguments[0].LIBH_STATIC.getAsNode()] : arguments
	);
});

const PARSE_BUFFER = {
	registry: Object.create(null),
	HTMLParser: new DOMParser(),
};

let portRegistry = null;

/**
 * 
 * @param { String[] } STRINGS 
 * @param { Function[] } KEYS 
 * 
 */

function createHTMLInstance({ STRINGS, KEYS }) {

	const BUFFER = {

		INSTANCE_UUID: window.crypto.randomUUID(),
		RENDER_TARGET_UUID: window.crypto.randomUUID(),

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
					BUFFER.keyMap += ` \${${BUFFER.INSTANCE_UUID}:${keyIndex}} `;
					if(KEYS[keyIndex].constructor.name !== "Function") {
						throw new Error("Can not use async function");
					} else {
						const typeMap = CORE.getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER.proxyHandleTemplate)));
						const resultBuffer = KEYS[keyIndex](typeMap);
						resultBuffer.onclick();
						console.log(typeMap);
					};
					break;
						
				case "object":
					BUFFER.keyMap += ` \${${BUFFER.INSTANCE_UUID}:${keyIndex}} `;
					BUFFER.portConfig = KEYS[keyIndex];
					if("global" in BUFFER.portConfig) {
						BUFFER.portConfig.global = CORE.getDeepCopy(BUFFER.portConfig.global);
					};
					if(("prop" in BUFFER.portConfig)) {
						throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved")
					};
					BUFFER.portConfig.onclick(BUFFER.portConfig)
					console.log((BUFFER.portConfig))
					break;

				default:
					BUFFER.keyMap += KEYS[keyIndex]

			};
		};
	};

	console.log(decodeURI(BUFFER.keyMap));

	setTimeout(function() {
		const TARGET = document.getElementById(BUFFER.RENDER_TARGET_UUID);
		if(!TARGET) {
			// instance creation process
			console.log(`instance created: ${BUFFER.INSTANCE_UUID}`);
		} else {
			// appending process
			console.log("html appended");
			TARGET.removeAttribute("id");
			TARGET.removeAttribute("hidden");
		};
	}, 0);

	return Object.assign(
		new String(`<span id=${BUFFER.RENDER_TARGET_UUID} hidden>${Date.now()}</span>`), {
			LIBH_STATIC: {
				FLAG: true,
				getAsNode() {
					const RETURN_NODE = document.createElement("span");
					RETURN_NODE.innerText = Date.now();
					RETURN_NODE.id = BUFFER.RENDER_TARGET_UUID;
					return RETURN_NODE;
				},
			},
		}
	);
};

function html(STRINGS, ...KEYS) {
	return createHTMLInstance({ STRINGS, KEYS });
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
