<div align="center">

![license](resources/logo.svg)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/ihasq/libh/tree/main/examples/quick-start?file=index.js)
![license](https://img.shields.io/badge/license-MIT-red)
[![npm](https://img.shields.io/npm/v/libh)](https://www.npmjs.com/package/libh)
</div>

----

html in javascript.\
less overhead, interacts with vanilla api.

```javascript
import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is ${Date}</h1>
}`;

// Active values ​​should be placed as pre-execution functions, not as primitive type
```

```javascript
// ...

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
