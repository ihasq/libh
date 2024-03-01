const instanceBuffer = {
	htmlTempMap: new Map()
};

export const html = (templates, ...values) => {

	const joinedString = templates.join(""),
		encodedHTMLTemp = instanceBuffer.htmlTempMap.get(joinedString);

	if(encodedHTMLTemp === undefined) {
		// initialization start
		values.forEach(valueIndex => {
			switch(true) {
				case valueIndex instanceof Function: {
					
				}
			}
		})
		instanceBuffer.htmlTempMap.set(joinedString);
	}

}

export const write = (htmlGeneratorFn) => {
	queueMicrotask(() => {
		document.getElementById()
	})
}

export const register = (name, htmlGeneratorFn) => {
	
}

const ReactiveButton = (attr) => {

	let count = 0;

	attr.class.onchange = event => {
		count = event.addedList
	}

	return () => html`
		<button style=${attr.class[1]} onclick=${() => count++}>
			I got clicked ${count} times!
		</button>
	`;
}

const Main = () => {

	let classList = [],
		styleProxy = css`
			* {
				color: #f00;
			}
		`,
		count = 0;

	return () => html`
		<div class=${classList} style=${styleProxy}></div>
		<${ReactiveButton} class="app"/>
		<div onclick=${() => count++}>
			${Date.now()}
		</div>
	`;
}