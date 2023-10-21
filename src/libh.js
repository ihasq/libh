/**
 * 
 * @param { function } callbackFn
 * @returns { object }
 * 
 */

function objectAnalyzer(callbackFn) {

	const analyzerTemplate = {
		get(target, property) {
			if(!(property in target)) {
				target[property] = Object.create(null);
				return new Proxy(target[property], analyzerTemplate);
			};
		},
	};

	function getDeepCopy(OBJECT_DATA) {
		const KEY_DATA = Object.keys(OBJECT_DATA);
		const RETURN_BUFFER = Object.create(null);
		for(let objectKeyIndex = 0; objectKeyIndex < Object.keys(OBJECT_DATA).length; objectKeyIndex++) {
			RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = (
				(typeof OBJECT_DATA[KEY_DATA[objectKeyIndex]] === "object")? getDeepCopy(OBJECT_DATA[KEY_DATA[objectKeyIndex]]) : OBJECT_DATA[KEY_DATA[objectKeyIndex]]
			);
		};
		return RETURN_BUFFER;
	};

	const outTemplate = callbackFn(new Proxy({}, analyzerTemplate));
	const objectKey = getDeepCopy(outTemplate);

	return callbackFn(objectKey);

};

console.log(objectAnalyzer($ => ({
	b: "wow",
	a: $.b,
})));

const UTIL = {
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



const propertyPreset = {
	global: () => "",
	class: key => key.class.split(" "),
};

const handleTemplate = {
	get: (target, prop) => {
		if(!(prop in target)) {
			return new Proxy(target, this)
		};
	},
};

function createElement({ STRINGS, KEYS }) {

	const INSTANCE_UUID = crypto.randomUUID();

	let staticBuffer = "";

	STRINGS.forEach(function(string, index) {
		staticBuffer += string + ((index + 1 === STRINGS.length)? "" : " libh-tag=instance-" + INSTANCE_UUID + "-" + index + " ");
	});

	const KEY_BUFFER = Object.create(null);

	KEYS.forEach((key, index) => {
		switch(typeof key) {
			case "function":
			break;
			case "object":
				for(const symbol in key) {
					KEY_BUFFER[symbol] = (symbol in propertyPreset)? propertyPreset[symbol](key) : key[symbol];
				};
			break;
		}
	});

	staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));

	// const RETURN_BUFFER = document.createDocumentFragment();

	// const TEMPLATE_BODY = ;

	// for(let index = 0; index < TEMPLATE_BODY.length; index++) {
	// 	RETURN_BUFFER.appendChild(TEMPLATE_BODY[0]);
	// };

	// // RETURN_BUFFER.querySelector("button").addEventListener("click", event => {
	// // 	console.log("wee")
	// // });

	// // RETURN_BUFFER.FLAG = "LIBH_INSTANCE";

	// const EVENT_QUERY = {

	// };

	setTimeout(function() {

	}, 0);

	return Object.assign(staticBuffer, {
		LIBH_VERIFIER: ""
	});
};

const FLAGS = {
	"enable-node-return": false,
	"disable-element-extension": false,
};

// const BUFFER = {

// 	elementRegistry: Object.create(null),

// 	sortTemplateMap({ STRINGS, KEYS }) {
// 		const RETURN_BUFFER = Object.create(null);
// 		let index = 0;
// 		for(index; index < STRINGS.length; index++) {
// 			RETURN_BUFFER[index * 2] = STRINGS[index];
// 			RETURN_BUFFER[index * 2 + 1] = KEYS[index];
// 		};
// 		delete RETURN_BUFFER[index * 2 - 1];
// 		return RETURN_BUFFER;
// 	},

// 	igniteElement(ELEMENT) {
		
// 	}
// };

const INFO = {
	"package": "libh",
	"cdn": "npm",
	"module": "html",
	"version": "0.0.16",
	"available-flags": Object.keys(FLAGS),
};

/**
 * 
 * @param {string} STRINGS 
 * @param  {...(object|function)} KEYS 
 * @returns 
 */

const html = (STRINGS, ...KEYS) => createElement({ STRINGS, KEYS });

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
	flag.forEach(function(FLAG_INDEX) {
		if(FLAG_INDEX in FLAGS) {
			if(!(FLAGS[FLAG_INDEX])) {
				FLAGS[FLAG_INDEX] = true;
			} else {
				console.info(`Flag "${FLAG_INDEX}" is already enabled`);
			}
		} else {
			console.warn(`Flag "${FLAG_INDEX}" is not available in version ${INFO.version}`);
		};
	});
};

Object.defineProperties(html.flag, {
	list: {
		get: function() {
			return Object.keys(FLAGS);
		},
		configurable: false,
	},
	state: {
		get: function() {
			return JSON.parse(JSON.stringify(FLAGS));
		},
		configurable: false,
	}
});

html.getTemplate = function() {
	return {
		router: {
			
		}
	}
};

Object.freeze(html);

export { html };