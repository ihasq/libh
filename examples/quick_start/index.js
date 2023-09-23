import { html } from "libh-html";

document.body.innerHTML = html`{
	<label>Current date is ${() => Date()}</label>
}`;