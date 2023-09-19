import { core } from "../core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
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
					join(functionStringArray) {
						this.joinedString = "";
						for(let i = 0; i < functionStringArray.length; i++) {
							this.joinedString += functionStringArray[i].replace(/\0/g, "");
							if(i + 1 !== functionStringArray.length) {
								this.joinedString += "\0" + i + "\0";
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