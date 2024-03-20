<div align="center">

![logo](https://raw.githubusercontent.com/ihasq/libh/main/resources/logo.svg)

[![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)](https://www.npmjs.com/package/libh)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

<hr/>
</div>

```javascript
import html from "https://esm.sh/libh";

const Count = () => {

    let count = 0,
        addCount = () => count++;
    
    return () => html`
        <div>
            <p>You clicked ${count} times</p>
            <button @click=${addCount}>
                Click me
            </button>
        </div>
    `;
}

// writing into HTML Document

html.write(Count, document.body);

// or define as Web Components

html.define(Count, "counter-thing");
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
import html from "libh";

const Counter = $ => {

    let count = 0,
        addCount = () => count++;

    return () => html`
        <button .onclick=${addCount} .count=${count}> <!-- go public as binding attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

html.write($ => () => html`
    <body>
        <p>👇 She got clicked ${$(Counter).count} times</p>
        <${Counter}/>
        <button @click=${$(Counter).onclick}>Bring some more...</button>
    </body>
`, document.body);
```

```javascript
const TodoRow = ({ el, remove }) => html`
    <div>
        <span>${el}</span>
        <button @click=${remove}>delete</button>
    </div>
`; // this single order function does not have its own scoped values, just like lit-html does

const TodoList = $ => {

    const
        todoMap = html.map((el, id) => html`
            <${TodoRow} el=${el} remove=${() => delete todoMap[id]}/>
        `),
        addTodo = async () => {
            todoMap.push((await $`input[type=text]`).value);
            $`input[type=text]`.value = "";
        };

    return () => html`
        <div>
            <ul>${todoMap}</ul>
            <input type=text/>
            <input type=button @click=${addTodo}/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {

    let revText = "",

    $`input[type=text]`.onkeydown = async () => {
        revText = (await $`input[type=text]`).value.split("").reverse().join("");
        // get reference from rendered DOM
    };

    return () => html`
        <div>
            <input type="text" />
            <h2>${revText}</h2>
        </div>
    `;
}
```

```javascript
const C2DApp = $ => {

    let ctx = undefined;

    $`canvas`.onload = () => {

        $`canvas`.onmousedown = event => {

        };

        ctx = $`canvas`.getContext("2d");
        // ...
    };

    return () => html`<canvas></canvas>`;
}
```

```javascript
const FrameMode = $ => {

    let count = 0,
        addCount = () => count++;

    return () => html`<button @click=${addCount}>${count}</button>`;
    // refresh every frame with requestAnimationFrame()
}

const SetMode = $ => {

    const { set } = html.use($)
    
    let count = 0,
        addCount = () => set(count++); // declaring replacement of primitives

    return () => html`<button @click=${addCount}>${count}</button>`;
    // refresh when set() called, improves performance
}
```