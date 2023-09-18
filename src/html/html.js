import { core } from "../core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
*/
const parseBuffer = {
	HTMLParser: new DOMParser(),
	resetBuffer() {
		Object.assign(this, {
			scope: {
				"{": false,
			},
			endIndex: -1,
			unifiedString: "",
			templateString: "",
			templateDOM: Object.create(null),
			keyLocation: [],
		})
	}
};

parseBuffer.resetBuffer();

function html(strings, ...keys) {
	// parse string
	for(let i = strings.length - 1; -1 < i; i--) {
		if(/}/.test(strings[i])) {
			parseBuffer.endIndex = i;
			break;
		};
	};
	if(parseBuffer.endIndex === -1) {
		throw new Error("Parse error");
	};
	console.log(parseBuffer.endIndex);
	for(let i = 0; i < parseBuffer.endIndex; i++) {
		parseBuffer.keyLocation.push(strings[i].length);
		if(/{/.test(strings[i])) {
			parseBuffer.scope["{"] = true;
			parseBuffer.templateString += strings[i].replace(/[\s\S]*{/, " ");
		} else if(parseBuffer.scope["{"]) {
			parseBuffer.templateString += strings[i];
		};
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
	parseBuffer.resetBuffer();
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