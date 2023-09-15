<div align="center">
	<img src="./docs/title.svg" width="300" height="110"></img>
	<h4>high performance html framework</h4>
</div>

---

### Quick start

```javascript
import libh from "https://unpkg.com/libh";

const { html } = libh;

document.body.innerHTML = html`{
    <label>Current time is ${Date}</label>
}`();

// Reactive state should be set as a function. like "Date", not "Date()"
```

### Create and register web components

```javascript
// ...

const reactiveButton = html`{
    <button onclick=${$ => $.this.count++}>
        I got clicked ${$ => $.this.count} times!
    </button>
}`;

reactiveButton.define("reactive-button");

document.body.innerHTML = html`{
    <reactive-button></reactive-button>
}`();
```

### Create custom attributes

```javascript
libh.attribute.define({
    "my-custom-attribute"(value, $) {
        $.innerText = value;
    }
})
```
