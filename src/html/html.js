import * as core from "../core/core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string. search where the key relates to (attribute or textNode)
	2. parse function
*/

const parseBuffer = {
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
							this.joinedString += functionStringArray[i];
							if(i + 1 !== functionStringArray.length) {
								this.joinedString += "${libh-key-" + this.instanceId + ":" + i + "}";
							}
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

parseBuffer.reset();

function html(strings, ...keys) {
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

html.getReservedKey = [
	"shared",
	"prop",
	"this",
	"static",
	"method",
	"meta"
]

export { html }