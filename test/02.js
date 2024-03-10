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

document.body.append(new html(Parent));

document.querySelector("body > div > button").click();

if(document.querySelector("body > div > span").textContent !== "1") {
	throw Error("failed");
}