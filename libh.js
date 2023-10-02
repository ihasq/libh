[
	{
		BASE_CLASS: Node,
		TARGET: "appendChild",
		ADDITION: function() {
			const HAS_LIBH_FLAG = (arguments[0].constructor.name === "String" && arguments[0].FLAG === "LIBH_INSTANCE");
			const LIBH_ELEMENT_NODE = arguments[0].getAsNode
			arguments[arguments.length - 1].apply(
				this, HAS_LIBH_FLAG? [LIBH_ELEMENT_NODE] : arguments
			);
			if(HAS_LIBH_FLAG) {
				return LIBH_ELEMENT_NODE;
			}
		}
	}
].forEach(function({ BASE_CLASS, TARGET, ADDITION }) {
	if (BASE_CLASS.prototype[TARGET]) {
		BASE_CLASS = BASE_CLASS.prototype
	} else if (!BASE_CLASS[TARGET]) {
		throw new Error('Cannot find hook')
	};
	const ORIGIN = BASE_CLASS[TARGET];
	BASE_CLASS[TARGET] = function() {
		arguments[arguments.length] = ORIGIN;
		arguments.length++;
		return ADDITION.apply(this, arguments);
	};
});

const UTIL = {
	getDeepCopy(objectData) {
		const KEY_DATA = Object.keys(objectData);
		const RETURN_BUFFER = Object.create(null);
		for(let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
			RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = (
				(typeof objectData[KEY_DATA[objectKeyIndex]] === "object")? this.getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]]
			)
		};
		return RETURN_BUFFER;
	},
	HTMLParser: new DOMParser(),
};

const QUERY = {
	BANNED_PROPERTY: [
		"prop",
		"super",
		"__proto__",
		"__defineGetter__",
		"__defineSetter__",
		"__lookupGetter__",
		"__lookupSetter__",
	],
	RESERVED_KEY: [
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
	]
};

const BUFFER = {
	flags: {
		"enable-node-return": false
	},
	elementRegistry: Object.create(null),
	createElement() {
		const INSTANCE_UUID = crypto.randomUUID()
		this.elementRegistry[INSTANCE_UUID] = {
			INSTANCE_UUID,
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
						const proxyRef = crypto.randomUUID();
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
			createRenderPath() {
				return {
					NONCE: crypto.randomUUID(),
				}
			}
		};
		return this.elementRegistry[INSTANCE_UUID];
	},
}

/**
 * 
 * @param {string} STRINGS 
 * @param  {...(object|function)} KEYS 
 * @returns 
 */

function html(STRINGS, ...KEYS) {

	const BUFFER_PATH = BUFFER.createElement();

	const RENDER_PATH = BUFFER_PATH.createRenderPath();

	for(let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
		BUFFER_PATH.keyMap += STRINGS[keyIndex];
		if(keyIndex + 1 !== STRINGS.length) {

			switch(typeof KEYS[keyIndex]) {

				case "function":
					BUFFER_PATH.keyMap += ` \${${BUFFER_PATH.INSTANCE_UUID}:${keyIndex}} `;
					if(KEYS[keyIndex].constructor.name !== "Function") {
						throw new Error("Can not use async function");
					} else {
						const typeMap = UTIL.getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER_PATH.proxyHandleTemplate)));
						const resultBuffer = KEYS[keyIndex](typeMap);
						resultBuffer.onclick();
						console.log(typeMap);
					};
				break;
						
				case "object":
					BUFFER_PATH.keyMap += ` \${${BUFFER_PATH.INSTANCE_UUID}:${keyIndex}} `;
					BUFFER_PATH.portConfig = KEYS[keyIndex];

					// sanitizing process
					for(let banIndex = 0; banIndex < QUERY.BANNED_PROPERTY.length; banIndex++) {
						delete BUFFER_PATH.portConfig[QUERY.BANNED_PROPERTY[banIndex]];
					};

					BUFFER_PATH.portConfig.onclick(BUFFER_PATH.portConfig)
					console.log((BUFFER_PATH.portConfig))
				break;

				default: BUFFER_PATH.keyMap += KEYS[keyIndex];

			};
		};
	};

	setTimeout(function() {
		const TARGET = document.getElementById(RENDER_PATH.NONCE);
		if(!TARGET) {
			// instance creation process
			console.log(`instance created: ${BUFFER_PATH.INSTANCE_UUID}`);
			BUFFER_PATH.returnObject.flag = undefined;
		} else {
			// appending process
			console.log("html appended");
			// removing nonce from identifier
			TARGET.removeAttribute("id");
			TARGET.removeAttribute("hidden");
		};
	}, 0);

	return Object.assign(new String(`<span id=${RENDER_PATH.NONCE} hidden></span>`), {
		get FLAG() {
			return "LIBH_INSTANCE"
		},
		get getAsNode() {
			const RETURN_NODE = document.createElement("span");
			RETURN_NODE.innerText = Date.now();
			RETURN_NODE.id = RENDER_PATH.NONCE;
			return RETURN_NODE;
		},
	});
};

Object.defineProperties(html, {
	reservedKey: {
		get: function() {
			return QUERY.RESERVED_KEY;
		},
		configurable: false,
	},
	info: {
		get: function() {
			return {
				"package": "libh",
				"cdn": "npm",
				"module": "html",
				"version": "0.0.16",
				"available-flags": Object.keys(BUFFER.flags),
			}
		},
		configurable: false,
	}
});

/**
 * @param  {...string} flag 
 */

html.flag = function(...flag) {
	for(const FLAG_INDEX of flag) {
		if(FLAG_INDEX in BUFFER.flags && !(BUFFER.flags[FLAG_INDEX])) {
			BUFFER.flags[FLAG_INDEX] = true;
		};
	};
};

Object.defineProperties(html.flag, {
	list: {
		get: function() {
			return Object.keys(BUFFER.flags);
		},
		configurable: false,
	},
	state: {
		get: function() {
			return JSON.parse(JSON.stringify(BUFFER.flags));
		},
		configurable: false,
	}
});

Object.freeze(html);

export { html };