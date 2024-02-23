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

const Counter = $ => {

    let count = 0,
        setCount = () => count++;

    $.libh.onbeforechange = () => Object.assign($, { count })
    
    return () => html`
        <button onclick=${setCount}>
            I got clicked ${count} times!
        </button>
    `;
}

// create HTML Element

document.body.append(html.createElement(Counter))

// or define as Web Components

customElements.define("stupid-counter", html.createClass(Counter))
```

HTML in JavaScript.\
less overhead, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### installation (npm)
```
npm i libh
```

### build from source
```
git clone https://github.com/ihasq/libh.git
npm run build
```

### usage
```javascript
// ...

const Main = $ => {

    let countProp = 0;

    $.libh.onchange = () => countProp = $.querySelector("#counter").count;

    return () => html`
        <div>
            <${Counter} id=counter/>
            ☝ She got clicked ${countProp} times!
        </div>
    `
}

document.body.append(html.createElement(Main))
```
