import * as core from "../core/core.js"
core.frameloop.ignite()

/*
	html instance constructor

	workflow:
	1. parse joined template literal string. search where the key relates to (attribute or textNode)
	2. parse function
*/

const parseBuffer = {
	registry: Object.create(null),
	HTMLParser: new DOMParser(),
	reset() {
		Object.assign(this, {
			template: {
				strings: {
					regex: {},
					stringTemplate: [],
					joinedString: "",
					instanceId: core.generateKeyIdentifier(),
					join(functionStringArray) {
						this.joinedString = "";
						for(let i = 0; i < functionStringArray.length; i++) {
							this.joinedString += functionStringArray[i] + ((i + 1 !== functionStringArray.length)? ("${" + this.instanceId + ":" + i + "}") : "")
						};
						this.joinedString = this.joinedString.slice(this.joinedString.indexOf("{") + 1, this.joinedString.lastIndexOf("}"));
						console.log(this.joinedString);
						console.log(parseBuffer.HTMLParser.parseFromString(this.joinedString, "text/html").body);
					}
				},
				keys: [],
			},
			unifiedString: "",
			templateString: "",
			templateDOM: Object.create(null),
			keyLocation: [],
		})
	}
};

function createHTMLInstance(id, strings, keys) {
	let keyMap = "", keyRegistry = Object.create(null);
	for(let i = 0; i < strings.length; i++) {
		keyMap += strings[i] + ((i + 1 !== strings.length)? ("${" + id + ":" + i + "}") : "")
	};
	keyMap = keyMap.slice(keyMap.indexOf("{") + 1, keyMap.lastIndexOf("}"));
	for(let i = 0; i < keys.length; i++) {
		if(typeof keys[i] === "function") {
		} else {
			throw new Error("dumb ass");
		}
	}
	return {
		keyMap
	}
};

parseBuffer.reset();

function html(strings, ...keys) {
	const INSTANCE_ID = core.generateKeyIdentifier();
	parseBuffer.registry[INSTANCE_ID] = createHTMLInstance(INSTANCE_ID, strings, keys);
	// parse string
	parseBuffer.template.strings.join(strings);
	parseBuffer.template.keys = keys;
	for(let i = 0; i < parseBuffer.endIndex; i++) {
		if((typeof keys[i]) === "function") {
			const registry = Object.create(null);
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
			registry.templateString = keys[i].toString();

			core.functionRegistry[core.functionRegistryLength] = {
				templateString: keys[i].toString(),
			};
			core.functionRegistryLength++;
		} else if((typeof keys[i]) === "object") {

		} else {

		}
	};
	// reset buffer
};

addEventListener("keydown", event => {
	console.log(Date.now())
	if(event.code === "Enter") {
		core.frameloop.push(function () {
			console.log(Date.now())
		});
	}
})

html.getReservedKey = [
	"shared",
	"prop",
	"this",
	"static",
	"method",
	"meta"
]

export { html }