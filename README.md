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

    $.onchange = () => Object.assign($, { count, addCount });
    
    return () => html`
        <button onclick=${addCount}>
            I got clicked ${count} times!
        </button>
    `;
}

document.body = html.createElement($ => () => html`
    <body>
        <${Counter}/>
        ☝ She got clicked ${$(Counter).count} times!
        <button onclick=${$(Counter).addCount}>
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
