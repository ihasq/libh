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

const Counter = () => {

    let count = 0,
        addCount = () => count++;
    
    return () => html`
        <div>
            <p>You clicked ${count} times</p>
            <button onClick=${addCount}>
                Click me
            </button>
        </div>
    `;
}

// create HTML Element

document.body.append(html.createElement(Counter))

// or define as Web Components

customElements.define("stupid-counter", html.createClass(Counter))
```

HTML in JavaScript.\
less boilerplate, transparent, built on top of standard html reference.

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

html.publicAttribute = ["class"];

const Counter = $ => {

    let count = 0,
        onclick = () => count++;

    return () => html`
        <button onclick=${addCount} count=${count}>
            I got clicked ${count} times!
        </button>
    `;
}

document.body = html.createElement($ => () => html`
    <body>
        <p>👇 She got clicked ${$(Counter).count} times!</p>
        <${Counter}/>
        <button onclick=${$(Counter).onclick}>
            add more!
        </button>
    </body>
`);
```

```javascript
/**
 *  $ {
 *      element: raw element reference includes querySelector or getAttribute
 *      onclick, onmousedown... setter of events, not like standard on-action event listener
 *  }
 **/
const TodoList = $ => {

    let text = $`input[type=text]`,
        todo = [],
        addTodo = () => todo.push(text.value);

    return () => html`
        <div>
            <ul>${todo.map(el => html`
                <li>${el}</li>
            `)}</ul>
            <input type=text/>
            <input type=button onclick=${addTodo}/>
        </div>
    `;
}
```
