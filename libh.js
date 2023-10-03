const INFO = {
	"package": "libh",
	"cdn": "npm",
	"module": "html",
	"version": "0.0.16",
	"available-flags": Object.keys(BUFFER.flags),
};

const DESC = {
	innerHTML: Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"),
	insertAdjacentHTML: Object.getOwnPropertyDescriptor(Element.prototype, "insertAdjacentHTML"),
};

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
		"enable-node-return": false,
		"disable-innerhtml-node": false,
	},
	elementRegistry: Object.create(null),

	sortTemplateMap({ STRINGS, KEYS }) {
		const RETURN_BUFFER = Object.create(null);
		let index = 0;
		for(index; index < STRINGS.length; index++) {
			RETURN_BUFFER[index * 2] = STRINGS[index];
			RETURN_BUFFER[index * 2 + 1] = KEYS[index];
		};
		delete RETURN_BUFFER[index * 2 - 1];
		return RETURN_BUFFER;
	},

	createElement({ STRINGS, KEYS }) {

		const INSTANCE_UUID = crypto.randomUUID();

		let staticBuffer = "";

		STRINGS.forEach(function(string, index) {
			staticBuffer += string + ((index + 1 === STRINGS.length)? "" : " libh-tag=instance-" + INSTANCE_UUID + "-" + index + " ");
		});

		staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));

		const RETURN_BUFFER = document.createDocumentFragment();

		const TEMPLATE_BODY = UTIL.HTMLParser.parseFromString(staticBuffer, "text/html").body

		const TEMPLATE_ELEMENT = TEMPLATE_BODY.children; 

		for(let index = 0; index < TEMPLATE_ELEMENT.length; index++) {
			RETURN_BUFFER.appendChild(TEMPLATE_ELEMENT[index]);
		};

		const EVENT_QUERY = {

		}

		return RETURN_BUFFER;
	},

	igniteElement(ELEMENT) {
		
	}
};

Object.defineProperty(Element.prototype, "innerHTML", {
	set: function(STRING){
		if(!BUFFER.flags["disable-innerhtml-node"] && STRING instanceof Node) {
			if(STRING.FLAG === "LIBH_INSTANCE") {
				BUFFER.igniteElement(STRING);
			};
			this.replaceChildren();
			this.appendChild(STRING);
		} else {
			DESC["innerHTML"].set.call(this, STRING);
		};
	}
});

/**
 * 
 * @param {string} STRINGS 
 * @param  {...(object|function)} KEYS 
 * @returns 
 */

function html(STRINGS, ...KEYS) {
	return BUFFER.createElement({ STRINGS, KEYS });
};


// for(let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
// 	REGISTRY.keyMap += STRINGS[keyIndex];
// 	if(keyIndex + 1 !== STRINGS.length) {

// 		switch(typeof KEYS[keyIndex]) {

// 			case "function":
// 				REGISTRY.keyMap += ` \${${REGISTRY.INSTANCE_UUID}:${keyIndex}} `;
// 				if(KEYS[keyIndex].constructor.name !== "Function") {
// 					throw new Error("Can not use async function");
// 				} else {
// 					const typeMap = UTIL.getDeepCopy(KEYS[keyIndex](new Proxy({}, REGISTRY.proxyHandleTemplate)));
// 					const resultBuffer = KEYS[keyIndex](typeMap);
// 					resultBuffer.onclick();
// 					console.log(typeMap);
// 				};
// 			break;
					
// 			case "object":
// 				REGISTRY.keyMap += ` \${${REGISTRY.INSTANCE_UUID}:${keyIndex}} `;
// 				REGISTRY.portConfig = KEYS[keyIndex];

// 				// sanitizing process
// 				for(let banIndex = 0; banIndex < QUERY.BANNED_PROPERTY.length; banIndex++) {
// 					delete REGISTRY.portConfig[QUERY.BANNED_PROPERTY[banIndex]];
// 				};

// 				REGISTRY.portConfig.onclick(REGISTRY.portConfig)
// 				console.log((REGISTRY.portConfig))
// 			break;

// 			default: REGISTRY.keyMap += KEYS[keyIndex];

// 		};
// 	};
// };

Object.defineProperties(html, {
	reservedKey: {
		get: function() {
			return QUERY.RESERVED_KEY;
		},
		configurable: false,
	},
	info: {
		get: function() {
			return JSON.parse(JSON.stringify(INFO))
		},
		configurable: false,
	}
});

/**
 * @param  {...string} flag 
 */

html.flag = function(...flag) {
	for(const FLAG_INDEX of flag) {
		if(FLAG_INDEX in BUFFER.flags) {
			if(!(BUFFER.flags[FLAG_INDEX])) {
				BUFFER.flags[FLAG_INDEX] = true;
			};
		} else {
			console.warn(`Flag "${FLAG_INDEX}" is not available in version ${INFO.version}`);
		}
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