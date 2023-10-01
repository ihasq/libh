import * as CORE from "./core.js";

const HTML_FLAG = {
	"enable-node-return": false
}

CORE.appendHook(Node, "appendChild", function() {
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

let portRegistry = null;

class LibhNode extends String {

	#BUFFER;

	constructor({ RENDER_TARGET_UUID, STRINGS, KEYS }) {

		super(`<span id=${RENDER_TARGET_UUID} hidden></span>`);

		this.#BUFFER = {
			INSTANCE_UUID: crypto.randomUUID(),
			RENDER_TARGET_UUID,
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
		};

		for(let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
			this.#BUFFER.keyMap += STRINGS[keyIndex];
			if(keyIndex + 1 !== STRINGS.length) {
				switch(typeof KEYS[keyIndex]) {
					case "function":
						this.#BUFFER.keyMap += ` \${${this.#BUFFER.INSTANCE_UUID}:${keyIndex}} `;
						if(KEYS[keyIndex].constructor.name !== "Function") {
							throw new Error("Can not use async function");
						} else {
							const typeMap = CORE.getDeepCopy(KEYS[keyIndex](new Proxy({}, this.#BUFFER.proxyHandleTemplate)));
							const resultBuffer = KEYS[keyIndex](typeMap);
							resultBuffer.onclick();
							console.log(typeMap);
						};
						break;
							
					case "object":
						this.#BUFFER.keyMap += ` \${${this.#BUFFER.INSTANCE_UUID}:${keyIndex}} `;
						this.#BUFFER.portConfig = KEYS[keyIndex];
						if("prop" in this.#BUFFER.portConfig) {
							throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved")
						};
						if("global" in this.#BUFFER.portConfig) {
							this.#BUFFER.portConfig.global = CORE.getDeepCopy(this.#BUFFER.portConfig.global);
						};
						this.#BUFFER.portConfig.onclick(this.#BUFFER.portConfig)
						console.log((this.#BUFFER.portConfig))
						break;
	
					default: this.#BUFFER.keyMap += KEYS[keyIndex]
				};
			};
		};
	
		console.log(this.#BUFFER.keyMap);
	
		setTimeout(function() {
			const TARGET = document.getElementById(RENDER_TARGET_UUID);
			if(!TARGET) {
				// instance creation process
				console.log(`instance created: ${this.#BUFFER.INSTANCE_UUID}`);
				this.#BUFFER.returnObject.flag = undefined;
			} else {
				// appending process
				console.log("html appended");
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
		RETURN_NODE.id = this.#BUFFER.RENDER_TARGET_UUID;
		return RETURN_NODE;
	}
};

function html(STRINGS, ...KEYS) {
	return new LibhNode({
		RENDER_TARGET_UUID: crypto.randomUUID(),
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
	}
});

html.flag = function() {
	for(const FLAG_INDEX of arguments) {
		if(FLAG_INDEX in HTML_FLAG && !(HTML_FLAG[FLAG_INDEX])) {
			HTML_FLAG[FLAG_INDEX] = true;
		};
	};
};

Object.assign(html.flag, {
	get state() {
		return JSON.parse(JSON.stringify(HTML_FLAG))
	}
});

export { html };
