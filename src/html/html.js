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
					joined: "",
					join(functionStringArray) {
						for(let i = 0; i < functionStringArray.length; i++) {
							this.joined += functionStringArray[i].replace(/\0/g, "") + ((i + 1 !== functionStringArray.length)? `\0${i}\0` : "")
						};
						console.log(this.joined);
						this.joined = this.joined.replace(/[\s\S].*{|}[\s\S].*/g, "");
						console.log(this.joined);
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
	parseBuffer.templateDOM = parseBuffer.HTMLParser.parseFromString(parseBuffer.templateString, "text/html");
	console.log(parseBuffer.templateDOM.body);
	// reset buffer
	parseBuffer.reset();
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