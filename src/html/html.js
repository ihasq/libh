import { core } from "../core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
*/
const parseBuffer = {
	templateString: "",
	templateDOM: Object.create(null),
	keyLocation: [],
	HTMLParser: new DOMParser()
};

function html(strings, ...keys) {
	// parse string
	for(let i = 0; i < strings.length; i++) {
		parseBuffer.keyLocation.push(strings[i].length);
		if(/{/.test(strings[i])) {
			parseBuffer.templateString += strings[i].replace(/[\s\S]*{/, " ");
		} else if(/}/.test(strings[i])) {
			parseBuffer.templateString += strings[i].replace(/}[\s\S]*/, " ");
			break;
		} else {
			parseBuffer.templateString += strings[i];
		};
	};
	parseBuffer.templateDOM = parseBuffer.HTMLParser.parseFromString(parseBuffer.templateString, "application/xml");
	console.log(parseBuffer.templateDOM);

	for(let i = 0; i < keys.length; i++) {
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
	Object.assign(parseBuffer, {
		templateString: "",
		templateDOM: Object.create(null),
		keyLocation: [],
	});
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