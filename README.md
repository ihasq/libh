<div align="center">
	<img src="./docs/resources/title.svg" width="300" height="110"></img>
	<h4>high performance html</h4>
    <h4><a href="./docs/docs.md">Documentation</a> | <a href="./docs/docs.md">Examples</a> | <a href="./docs/docs.md">Contributing</a></h4>
</div>

---


### Quick start
[Stackblitz](https://stackblitz.com/project)

```javascript
import { html } from "https://unpkg.com/libh";

document.body.innerHTML = html`{
    <label>Current time is ${Date}</label>
}`();

// Reactive state should be set as a function. like "Date", not "Date()"
```

### Create and register web components

```javascript
// ...

const reactiveButton = html`{
    <button onclick=${$ => $.count++}>
        I got clicked ${$ => $.count} times!
    </button>
}`;

reactiveButton.define("reactive-button");

document.body.innerHTML = html`{
    <reactive-button></reactive-button>
}`();
```

### Create custom attributes

```javascript
// ...

html.attribute.define({
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
