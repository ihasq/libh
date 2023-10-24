<div align="center">

![logo](https://raw.githubusercontent.com/ihasq/libh/main/resources/logo.svg)

![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

<hr/>
</div>

```javascript
import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is { Date }</h1>
}`;

// Active values ​​should be placed as pre-execution functions, not as primitive type
```

HTML in JavaScript.\
less overhead, interacts with vanilla api.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

```javascript
// ...

import style from "./style.css" assert { type: "css" }

const ReactiveButton = html`{
    <button ${{
        style,
        count: 0
        onclick() {
            this.count++
        },
    }}>I got clicked { this.count } times!</button>
}`;

// use as node

document.body.appendChild(new ReactiveButton());

// embed in

document.body.innerHTML = html`{
    <${ReactiveButton} />
}`;

// or export

export { ReactiveButton };
```

```javascript
// use function in html

const multiply = value => value * 2;

const NumberDemo = html`{
    <input id="input_num" type="number" /> * 2 = ${multiply}(document.getElementById("input_num").value)
}`;
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
