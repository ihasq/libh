<div align="center">

![logo](https://raw.githubusercontent.com/ihasq/libh/main/resources/logo.svg)

[![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)](https://www.npmjs.com/package/libh)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

<hr/>
</div>

```javascript
import { html } from "https://esm.sh/libh";

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

document.body.appendChild(new html(Count));
```

HTML in JavaScript.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Installation (npm)
```
npm i libh
```

### Build From Source
```
git clone https://github.com/ihasq/libh
npm run build
```

### Usage
```javascript
import { html } from "libh";

const Counter = () => {

    let count = 0,
        addCount = () => count++;

    return () => html`
        <button onclick=${addCount} count=${count}> <!-- go public as top-level attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

document.body = new html($ => () => html`
    <body>
        <p>👇 She got clicked ${$(Counter).count} times</p> <!-- pre-initialization $() returns LHPtr, contains Proxy with Functions -->
        <${Counter}/>
        <button onclick=${$(Counter).onclick}> <!-- call addCount() in Counter -->
            Bring some more
        </button>
    </body>
`);
```

```javascript
const TodoRow = $ => () => html`
    <div>
        <span>${$.el}</span>
        <button onclick=${() => $.remove()}>delete</button>
    </div>
`;

const TodoList = $ => {

    let todo = [],
        addTodo = () => todo.push($`input[type=text]`.value);

    return () => html`
        <div>
            <ul>${todo.map((el, i) => html`
                <${TodoRow} el=${el} remove=${() => delete todo[i]}/>
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

    $.onload = () => {

        $`canvas`.onmousedown = event => {

        };

        ctx = $`canvas`.element.getContext("2d");
        // ...
    };

    return () => html`<canvas></canvas>`;
}
```

### Double-Function Architecture
libh avoids using "reactive" things like ```state``` and ```hook``` to build the DOM tree.\
By forcing the use of functions that return functions, so-called **double functions**, you can use international standard scope variables such as ```let``` and ```const``` to maintain its state.