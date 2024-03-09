import { html } from "../src/mod.js";

const Counter = () => {

	let count = 0;

	return () => html`
		<button onclick=${() => count++}>
			${count}
		</button>
	`;
};

document.body.append(html.createElement(Counter)); // HTMLButtonElement should be appended

document.querySelector("body > button").click();

if(document.querySelector("body > button").textContent !== "1") {
	throw Error("failed");
}