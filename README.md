<img src="./docs/title.svg" ></img>
<h4 align="center">high performance html framework</h4>

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
    <button onclick=${$ => $.this.count++}>
        I got clicked ${$ => $.this.count} times!
    </button>
}`;

reactiveButton.define("reactive-button");

document.body.innerHTML = html`{
    <reactive-button></reactive-button>
}`();
```