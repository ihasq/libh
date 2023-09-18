import { core } from "../core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
*/
const parseBuffer = {
	HTMLParser: new DOMParser(),
	regex: {
		begin: new RegExp(/{/g),
		end: new RegExp(/}$/g)
	},
	reset() {
		Object.assign(this, {
			template: {
				strings: {
					joinedString: "",
					join(functionStringArray) {
						this.joinedString = "";
						for(let i = 0; i < functionStringArray.length; i++) {
							this.joinedString += functionStringArray[i].replace(/\0/g, "") + ((i + 1 !== functionStringArray.length)? `\0${i}\0` : "")
						};
						console.log(this.joinedString);
						parseBuffer.regex.begin.test(this.joinedString);
						parseBuffer.regex.end.test(this.joinedString);
						this.joinedString = this.joinedString.slice(parseBuffer.regex.begin.lastIndex, parseBuffer.regex.end.lastIndex - 1);
						console.log(this.joinedString)
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