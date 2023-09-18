# ``libh - html in javascript``

### Quick start
[Stackblitz](https://stackblitz.com/project)

```javascript
import { html } from "https://unpkg.com/libh";

document.body.innerHTML = html`{
	<label>Current time is ${Date}</label>
}`();

// Reactive state should be set as a function. like "Date", not "Date()"
```

### Create and use component

```javascript
// ...

const reactiveButton = html`{
	<button onclick=${$ => $.count++}>
		I got clicked ${$ => $.count} times!
	</button>
}`;

document.body.innerHTML = html`{
	<${reactiveButton} />
}`();
```

### Create custom attributes

```javascript
import { attr } from "https://unpkg.com/libh";

attr.define({
	"my-custom-attribute"(value, $) {
		$.innerText = value;
	}
})
```
then put into plain html, reactively changes when the attribute has changed

```html
<div my-custom-attribute="value from custom attribute"></div>
<!-- attribute is reactive --->
```
