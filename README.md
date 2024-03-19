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
            <button onclick=${addCount}>
                Click me
            </button>
        </div>
    `;
}

// create HTML Element

document.body.appendChild(html.element(Count));

// or define as Web Components

customElements.define("counter-thing", html.class(Count));
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
        <button onclick=${addCount} count=${count}> <!-- go public as top-level attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

document.body = html.createElement($ => {

    const [ counterRef ] = html.selector();

    return () => html`
        <body>
            <p>👇 She got clicked ${counterRef.count} times</p>
            <${Counter} ${counterRef}/>
            <button onclick=${counterRef.onclick}>Bring some more...</button>
        </body>
    `;
});
```

```javascript
const TodoRow = ({ el, remove }) => html`
    <div>
        <span>${el}</span>
        <button onclick=${remove}>delete</button>
    </div>
`; // this single order function does not have its own scoped values, just like lit-html does

const TodoList = $ => {

    const
        [ todoInput ] = html.selector();
        todoMap = html.map((el, id) => html`
            <${TodoRow} el=${el} remove=${() => delete todoMap[id]}/>
        `),
        addTodo = () => {
            todoMap.push(todoInput.value);
            todoInput.value = "";
        };

    return () => html`
        <div>
            <ul>${todoMap}</ul>
            <input type=text ${todoInput}/>
            <input type=button onclick=${addTodo}/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {

    const [ baseText ] = html.selector();

    let revText = "",

    baseText.onkeydown = async () => {
        revText = (baseText.value).split("").reverse().join("");
    };
    // async function called after refreshing DOM

    return () => html`
        <div>
            <input type="text" ${baseText}/>
            <h2>${revText}</h2>
        </div>
    `;
}
```

```javascript
const C2DApp = $ => {

    const [ baseCanvas ] = html.selector();

    let ctx = undefined;

    baseCanvas.onload = () => {

        baseCanvas.onmousedown = event => {

        };

        ctx = baseCanvas.getContext("2d");
        // ...
    };

    return () => html`<canvas ${baseCanvas}></canvas>`;
}
```

```javascript
const FrameMode = $ => {

    let count = 0,
        addCount = () => count++;

    return () => html`<button onclick=${addCount}>${count}</button>`;
    // refresh every frame with requestAnimationFrame()
}

const SetMode = $ => {

    const { set } = $; // changes into set mode

    let count = 0,
        addCount = () => count = set(count + 1); // declaring replacement of primitives

    return () => html`<button onclick=${addCount}>${count}</button>`;
    // refresh when set() called, improves performance
}
```