import { html } from "../src/mod.js";

const Child = () => {

	let count = 0;

	return () => html`
		<button onclick=${() => count++} count=${count}>
			${count}
		</button>
	`;
};

const Parent = $ => () => html`
	<div>
		<${Child}/>
		<span>${$(Child).count}</span>
	</div>
`;

document.body.append(html.createElement(Parent));

document.querySelector("body > button").click();

if(document.querySelector("body > button").textContent !== "1") {
	throw Error("failed");
}