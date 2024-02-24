import { html } from "./src/mod.js";

const Main = $ => {
	let count = 0;
	return () => html`
		<body>
			<button onclick=${() => count++}>${count}</button>
		</body>
	`;
};

document.body = html.createElement(Main);

document.querySelector("body > button").click();

if(document.querySelector("body > button").textContent !== "1") {
	throw Error("failed");
}