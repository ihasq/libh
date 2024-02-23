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

    let count = 0;
    
    return () => html`
        <button onclick=${() => count++}>
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

const Counter = $ => {

    let count = 0,
        addCount = () => count++;

    $.libh.onbeforechange = () => Object.assign($, { count, addCount }); // public
    
    return () => html`
        <button onclick=${addCount}>
            I got clicked ${count} times!
        </button>
    `;
}

const Main = $ => () => html`
    <body>
        <${Counter} id=counter/>
        ☝ She got clicked ${$`#counter`.count} times!
        <button onclick=${$`#counter`.addCount()}>
            add more!
        </button>
    </body>
`;

document.body = html.createElement(Main)
```

```javascript
const TodoList = $ => {

    let todo = [];

    return () => html`
        <div>
            <ul>${todo.map(el => html`
                <li>${el}</li>
            `)}</ul>
            <input type=text/>
            <input type=button onclick=${() => todo.push($`input[type=text]`.value)}/>
        </div>
    `;
}
```
