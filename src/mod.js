const instanceBuffer = {
	htmlTempMap: new Map()
};

class LHTemplate {
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
	if(!instanceBuffer.htmlTempMap.has(joinedHTMLTemplates)) {
		templateConstructor.innerHTML = joinedHTMLTemplates;
		// instanceBuffer.htmlTempMap.set(joinedHTMLTemplates, );
	}

	const joinedString = htmlTemplates.join(""),
		encodedHTMLTemp = instanceBuffer.htmlTempMap.get(joinedString);

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

html.createElement = (templateFn) => {
	templateFn($);
	return document.createElement("div");
}

html.createClass = (templateFn) => {

}

Object.freeze(html);

export default html;