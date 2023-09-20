# ``libh - html in javascript``
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://ihasq.com)
proof of concept

```javascript
import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is ${Date}</h1>
}`();
```

```javascript
// ...

const reactiveButton = html`{
    <button onclick=${$ => $.count++}>I got clicked ${$ => $.count} times!</button>
}`;

document.body.innerHTML = html`{
    <${reactiveButton} ${$ => {
        $.super();
        $.alert("I clicked!");
    }}/>
}`();
```