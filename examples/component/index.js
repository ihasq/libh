import { html } from "libh";

const reactiveButton = html`{
	<button onclick=${$ => $.count++}>
		I got clicked ${$ => $.count} times!
	</button>
}`

document.body.innerHTML = html`{
	<${reactiveButton} />
}`;