import write from "../src/mod.js";

const Child = $ => {

	let count = 0;

	return h => h`
		<button onclick=${() => count++} count=${count}>
			${count}
		</button>
	`;
};

const Parent = $ => h => h`
	<div>
		<${Child}/>
		<span>${$(Child).count}</span>
	</div>
`;

write(Parent, document.body)

document.querySelector("body > div > button").click();

if(document.querySelector("body > div > span").textContent !== "1") {
	throw Error("failed");
}