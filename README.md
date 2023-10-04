<div align="center">

![license](https://raw.githubusercontent.com/ihasq/libh/main/resources/logo.svg)

![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)
![npm](https://img.shields.io/npm/dt/libh)

</div>

----

html in javascript.\
less overhead, interacts with vanilla api.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

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
