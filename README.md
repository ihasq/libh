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

document.body.appendChild(html.createElement(Count));
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

const Counter = () => {

    let count = 0,
        addCount = () => count++;

    return () => html`
        <button onclick=${addCount} count=${count}> <!-- go public as top-level attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

document.body = html.createElement($ => {
    return () => html`
        <body>
            <p>👇 She got clicked ${$(Counter).count} times</p>
            <${Counter}/>
            <button onclick=${$(Counter).onclick}>Bring some more...</button>
        </body>
    `;
});
```

```javascript

const TodoRow = $ => () => html`
    <div>
        <span>${$.el}</span>
        <button onclick=${$.remove}>delete</button>
    </div>
`;

const TodoList = $ => {

    const todo = html.map((el, id) => html`
        <${TodoRow} el=${el} remove=${() => delete todo[id]}>
    `);

    const addTodo = async () => {
        todo.push(await $`input[type=text]`.value);
        $`input[type=text]`.value = "";
    };

    return () => html`
        <div>
            <ul>${todo}</ul>
            <input type=text/>
            <input type=button onclick=${addTodo}/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {

    let revText = "",

    $`input[type=text]`.onkeydown = async () => {
        revText = (await $`input[type=text]`.value).split("").reverse().join("");
    }

    return () => html`
        <div>
            <input type="text"/>
            <h2>${revText}</h2>
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