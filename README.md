# ``libh - html in javascript``
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-kydnun?file=index.js)

proof of concept: this does not work

```javascript
// quick start

import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is ${Date}</h1>
}`; // This returns compiled HTMLElement

// Reactive values ​​should be placed as pre-execution functions and not as primitive types.
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
}`;

// or

export { reactiveButton };
```
### installation (npm)
```
npm i libh
```

### build from source
```
git clone https://github.com/ihasq/libh.git
npm run build
```