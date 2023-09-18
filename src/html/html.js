import { core } from "../core.js"

/*
	html instance constructor

	workflow:
	1. parse joined template literal string, search where the key comes from
	2. 
*/

const HTMLParser = new DOMParser();

function html(strings, ...keys) {
	// parse string
	const strMap = [];
	for(let i = 0; i < strings.length; i++) {
		if(/{/.test(strings[i])) {
			strMap.push(strings[i].length - ((i === 0 || i === strings.length - 1)? 1 : 0))
		}
	};
	console.log(strMap);
	const parseTemp = strings.join("").match(/\{([\s\S]*)\}/)[1];
	// console.log(HTMLParser.parseFromString(strings.join("'libh-blank-value'").match(/\{([\s\S]*)\}/)[1], "application/xml"));

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
	}
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