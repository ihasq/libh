import { html } from "libh";

const reactiveButton = html`{
	<button ${$ => ({
		count: 0,
		onclick: () => $.count++
	})}>I got clicked ${$ => $.count} times!</button>
}`

document.body.innerHTML = html`{
	<${reactiveButton} />
}`;