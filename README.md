<div align="center">
	<img src="./docs/title.svg" width="300" height="110"></img>
	<h4>high performance html framework</h4>
</div>

---

### Quick start

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

document.body.innerHTML = html`{
    <${reactiveButton} />
}`();
```

### Create custom attributes

```javascript
import { attribute } from "https://unpkg.com/libh"

attribute.define({
    "my-custom-attribute"(value, $) {
        $.innerText = value;
    }
})
```