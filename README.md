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

const Count = () => {

    let count = 0,
        addCount = () => count++;
    
    return () => html`
        <div>
            <p>You clicked ${count} times</p>
            <button onclick=${addCount}>
                Click me
            </button>
        </div>
    `;
}

// create HTML Element

document.body.append(html.createElement(Count));

// define as Web Components

customElements.define("something-reactive", html.createClass(Count));
```

HTML in JavaScript.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### installation (npm)
```
npm i libh
```

### build from source
```
git clone https://github.com/ihasq/libh
npm run build
```

### usage
```javascript
import { html } from "libh";

const Counter = $ => {

    let count = 0,
        addCount = () => count++;

    return () => html`
        <button onclick=${addCount} count=${count}> <!-- go public as top-level attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

document.body = html.createElement($ => () => html`
    <body>
        <p>👇 She got clicked ${$(Counter).count} times</p> <!-- pre-initialization $().property returns Promise -->
        <${Counter}/>
        <button onclick=${$(Counter).onclick}> <!-- call addCount() in Counter -->
            Bring some more
        </button>
    </body>
`);
```

```javascript
const TodoList = $ => {

    let todo = [],
        addTodo = () => todo.push($`input[type=text]`.value);

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

```javascript
const C2DApp = $ => {

    let ctx = undefined;

    setTimeout(() => {

        $`canvas`.onmousedown = event => {

        };

        ctx = $`canvas`.element.getContext("2d");
        // ...
    });

    return () => html`<canvas></canvas>`;
}
```