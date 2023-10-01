import * as CORE from "./core.js";

/*
 * 	krmbn0576 さんに感謝します: Qiita記事「JavaScriptのフックパターンの楽な書き方」
 * 	https://qiita.com/krmbn0576/items/473e18e182972b41dd1b
 */


CORE.hook(Node, "appendChild", function() {
	const HAS_LIBH_FLAG = (arguments[0].FLAG === "LIBH_INSTANCE");
	const LIBH_ELEMENT_NODE = arguments[0].getAsNode()
	arguments[arguments.length - 1].apply(
		this, HAS_LIBH_FLAG? [LIBH_ELEMENT_NODE] : arguments
	);
	if(HAS_LIBH_FLAG && HTML_FLAG["enable-node-return"]) {
		return LIBH_ELEMENT_NODE;
	}
});

const HTML_FLAG = {
	"enable-node-return": false
}

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

		returnObject: Object.create(null),

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
		BUFFER.keyMap += STRINGS[keyIndex];
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
					if("prop" in BUFFER.portConfig) {
						throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved")
					};
					if("global" in BUFFER.portConfig) {
						BUFFER.portConfig.global = CORE.getDeepCopy(BUFFER.portConfig.global);
					};
					BUFFER.portConfig.onclick(BUFFER.portConfig)
					console.log((BUFFER.portConfig))
					break;

				default: BUFFER.keyMap += KEYS[keyIndex]
			};
		};
	};

	console.log(BUFFER.keyMap);

	BUFFER.returnObject = new CORE.LibhIdentifier({ uuid: BUFFER.RENDER_TARGET_UUID })

	setTimeout(function() {
		const TARGET = document.getElementById(BUFFER.RENDER_TARGET_UUID);
		if(!TARGET) {
			// instance creation process
			console.log(`instance created: ${BUFFER.INSTANCE_UUID}`);
			BUFFER.returnObject.flag = undefined;
		} else {
			// appending process
			console.log("html appended");
			TARGET.removeAttribute("id");
			TARGET.removeAttribute("hidden");
		};
	}, 0);

	return BUFFER.returnObject;
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

html.flag = function() {
	for(const FLAG_INDEX of arguments) {
		if(FLAG_INDEX in HTML_FLAG && !(HTML_FLAG[FLAG_INDEX])) {
			HTML_FLAG[FLAG_INDEX] = true;
		};
	};
};

Object.defineProperties(html.flag, {
	state: {
		get: function() {
			return JSON.parse(JSON.stringify(HTML_FLAG))
		}
	}
});

export { html };
