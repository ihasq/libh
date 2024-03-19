import html from "../src/mod.js";

const Counter = $ => {

	const { set } = $;

	let count = 0;

	return () => html`
		<button onclick=${() => set(count++)}>
			${count}
		</button>
	`;
};

document.body.appendChild(html`<${Counter}/>`); // HTMLButtonElement should be appended

document.querySelector("body > button").click();

if(document.querySelector("body > button").textContent !== "1") {
	throw Error("failed");
}