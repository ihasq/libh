const htmlTempMap = new Map();
const anchorMap = new Map();

function createLHAnchor() {
	let writeMode = "frame";
	return [
		{
			get set() {
				writeMode = "set";
				return function() {

				}
			}
		},

	]
}

function createLHInstance(templateFn, attributes) {
	
}

class LHInstance {
	constructor(templateFn, attributes) {
		templateFn(createLHAnchor()[0])
	}
}

for(const anchorIndex in anchorList) {
	anchorMap.set(anchorIndex, anchorList[anchorIndex])
}

class LHTemplate {
	constructor() {

	}
}

class LHSelector {
	constructor() {

	}
}

const templateConstructor = globalThis.document.createElement("div");

const initTag = ("libh" + btoa(
	String.fromCharCode.apply(
		null,
		crypto.getRandomValues(new Uint8Array(64)),
	)
) + "\u0020");

const localSelector = (selectorTemplates, ...selectorValues) => {
	if(
		typeof selectorTemplates !== "array" &&
		typeof selectorTemplates === "function"
	) {

	}
	return new Proxy({}, {
		get(t, props) {
			switch(props) {
				case "onload": {
					return 
				}
			}
		},
		set(t, props, value) {
			switch(props) {
				case "onload": {
					return value instanceof Function
						? () => {
							
						}
						: undefined;
				}
			}
		}
	});
}

const $ = new Proxy(localSelector, {
	get(t, p) {

	}
});

const html = (htmlTemplates, ...htmlValues) => {
	const joinedHTMLTemplates = htmlTemplates.join(initTag);
	if(!htmlTempMap.has(joinedHTMLTemplates)) {
		templateConstructor.innerHTML = joinedHTMLTemplates;
		// instanceBuffer.htmlTempMap.set(joinedHTMLTemplates, );
	}

	const joinedString = htmlTemplates.join(""),
		encodedHTMLTemp = htmlTempMap.get(joinedString);

	if(encodedHTMLTemp === undefined) {
		// initialization start
		htmlValues.forEach(valueIndex => {
			switch(true) {
				case valueIndex instanceof Function: {
					
				}
			}
		})
		instanceBuffer.htmlTempMap.set(joinedString);
	}

}

html.class = function(templateFn) {

}

html.map = function(constructorFn) {
	
};

html.selector = function() {

};

Object.freeze(html);

export default html;