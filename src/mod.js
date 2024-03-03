const instanceBuffer = {
	htmlTempMap: new Map()
};

const templateConstructor = globalThis.document.createElement("div");

const initTag = ("libh" + btoa(
	String.fromCharCode.apply(
		null,
		crypto.getRandomValues(new Uint8Array(64)),
	)
));

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

	templateConstructor.innerHTML = htmlTemplates.join(initTag);

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
	templateFn($)
}

html.createClass = (templateFn) => {

}

export { html }