import * as util from "./util.js"

util.appendHook(Node, "appendChild", function() {
	const HAS_LIBH_FLAG = (arguments[0].FLAG === "LIBH_INSTANCE");
	const LIBH_ELEMENT_NODE = arguments[0].getAsNode
	arguments[arguments.length - 1].apply(
		this, HAS_LIBH_FLAG? [LIBH_ELEMENT_NODE] : arguments
	);
	if(HAS_LIBH_FLAG) {
		return LIBH_ELEMENT_NODE;
	}
});


const PARSE_BUFFER = {
	registry: Object.create(null),
	HTMLParser: new DOMParser(),
};

const BANNED_PROPERTY = [
	"prop",
	"super",
	"__proto__",
	"__defineGetter__",
	"__defineSetter__",
	"__lookupGetter__",
	"__lookupSetter__",
];

const HTML_FLAG = {
	"enable-node-return": false
};

class LibhNode extends String {

	#buffer;

	constructor({ RENDER_TARGET_NONCE, STRINGS, KEYS }) {

		super(`<span id=${RENDER_TARGET_NONCE} hidden></span>`);

		this.#buffer = {
			INSTANCE_UUID: crypto.randomUUID(),
			RENDER_TARGET_NONCE,
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
		}

		for(let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
			this.#buffer.keyMap += STRINGS[keyIndex];
			if(keyIndex + 1 !== STRINGS.length) {

				switch(typeof KEYS[keyIndex]) {

					case "function":
						this.#buffer.keyMap += ` \${${this.#buffer.INSTANCE_UUID}:${keyIndex}} `;
						if(KEYS[keyIndex].constructor.name !== "Function") {
							throw new Error("Can not use async function");
						} else {
							const typeMap = util.getDeepCopy(KEYS[keyIndex](new Proxy({}, this.#buffer.proxyHandleTemplate)));
							const resultBuffer = KEYS[keyIndex](typeMap);
							resultBuffer.onclick();
							console.log(typeMap);
						};
					break;
							
					case "object":
						this.#buffer.keyMap += ` \${${this.#buffer.INSTANCE_UUID}:${keyIndex}} `;
						this.#buffer.portConfig = KEYS[keyIndex];

						// sanitizing process
						for(let banIndex = 0; banIndex < BANNED_PROPERTY.length; banIndex++) {
							delete this.#buffer.portConfig[BANNED_PROPERTY[banIndex]];
						};

						this.#buffer.portConfig.onclick(this.#buffer.portConfig)
						console.log((this.#buffer.portConfig))
					break;
	
					default: this.#buffer.keyMap += KEYS[keyIndex];

				};
			};
		};
	
		console.log(this.#buffer.keyMap);
	
		setTimeout(function() {
			const TARGET = document.getElementById(RENDER_TARGET_NONCE);
			if(!TARGET) {
				// instance creation process
				console.log(`instance created: ${this.#buffer.INSTANCE_UUID}`);
				this.#buffer.returnObject.flag = undefined;
			} else {
				// appending process
				console.log("html appended");
				// removing nonce from identifier
				TARGET.removeAttribute("id");
				TARGET.removeAttribute("hidden");
			};
		}, 0);
	};

	get FLAG() {
		return "LIBH_INSTANCE"
	};

	get getAsNode() {
		const RETURN_NODE = document.createElement("span");
		RETURN_NODE.innerText = Date.now();
		RETURN_NODE.id = this.#buffer.RENDER_TARGET_NONCE;
		return RETURN_NODE;
	};
};

function html(STRINGS, ...KEYS) {
	return new LibhNode({
		RENDER_TARGET_NONCE: crypto.randomUUID(),
		STRINGS,
		KEYS
	});
};

Object.assign(html, {
	get reservedKey() {
		return [
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
	},
	get info() {
		return {
			"package": "libh",
			"cdn": "npm",
			"module": "html",
			"version": "0.0.16",
			"available-flags": Object.keys(HTML_FLAG),
		}
	}
});

/**
 * @param  {...string} flag 
 */

html.flag = function(...flag) {
	for(const FLAG_INDEX of flag) {
		if(FLAG_INDEX in HTML_FLAG && !(HTML_FLAG[FLAG_INDEX])) {
			HTML_FLAG[FLAG_INDEX] = true;
		};
	};
};

Object.assign(html.flag, {
	get list() {
		return Object.keys(HTML_FLAG)
	},
	get state() {
		return JSON.parse(JSON.stringify(HTML_FLAG))
	}
});

export { html };
