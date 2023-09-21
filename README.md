# ``libh - html in javascript``
```
npm i libh
```
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://ihasq.com)

proof of concept: this does not work

```javascript
// quick start

import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is ${Date}</h1>
}`();

// Reactive values ​​should be placed as pre-execution function entities rather than primitives.
```

```javascript
// create component

const reactiveButton = html`{
    <button onclick=${$ => $.count++}>
        I got clicked ${$ => $.count} times!
    </button>
}`;

document.body.innerHTML = html`{
    <${reactiveButton} />
}`();

// or

export { reactiveButton };
```
