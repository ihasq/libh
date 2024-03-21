<div align="center">

![logo](https://raw.githubusercontent.com/ihasq/libh/main/resources/logo.svg)

[![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)](https://www.npmjs.com/package/libh)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

<hr/>
</div>

```javascript
const Count = () => {

    let count = 0;
    
    return html => html`
        <div *color=red>
            <p>You clicked ${count} times</p>
            <button @click=${() => count++}>
                Click me
            </button>
        </div>
    `;
}

const libh = await import("https://esm.sh/libh");

// write into HTML Document

libh.write({ "body > #counter": Count });

// or define as Web Components

libh.define({ "counter-thing": Count });

// ...or create fully-routed HTTP server

libh.serve({ "/": Count });
```

HTML in JavaScript.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Installation (cdn)
```javascript
const libh = await (
    import("https://esm.sh/libh") ||
    import("https://unpkg.com/libh") ||
    import("https://cdn.jsdelivr.net/npm/libh")
);
```

### Build From Source
```
git clone https://github.com/ihasq/libh
deno task build
```

### Smart Attributes
```javascript
// text
html`<label>${text}</label>`;

// attribute
html`<form id=${formId}/>`;

// event handler
html`<button @click=${() => alert("clicked")}/>`;

// style
html`<h1 *color=${titleColor}></h1>`;

// property
html`<input type=text .value=${value} />`;

// boolean
html`<input type=checkbox ?checked=${isChecked} />`;
```

### Usage
```javascript
import { write } from "libh";

const Counter = () => {

    let count = 0;

    return html => html`
        <button @click=${() => count++} .count=${count}> <!-- go public as binding attributes -->
            I got clicked ${count} times!
        </button>
    `;
}

const Main = $ => {
    return html => html`
        <body>
            <p>👇 She got clicked ${$(Counter).count} times</p>
            <${Counter}/>
            <button @click=${() => $(Counter).click()}>Bring some more...</button>
        </body>
    `;
}

write({ "body": Count });
```

```javascript
const TodoRow = ({ at: { el, remove } }) => h => h`
    <div>
        <span>${el}</span>
        <button @click=${remove}>delete</button>
    </div>
`; // this single order function does not have its own scoped values, just like lit-html does

const TodoList = $ => {

    const todoMap = $.map((el, id) => h => h`
        <${TodoRow} .el=${el} .remove=${() => delete todoMap[id]}/>
    `);

    return html => html`
        <div>
            <ul>${todoMap}</ul>
            <input type=text/>
            <input type=button @click=${async () => {
                todoMap.push((await $`input[type=text]`).value);
                $`input[type=text]`.value = "";
            }}/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {

    let revText = "";

    return html => html`
        <div>
            <input type="text" @keydown=${async () => {
                revText = (await $`input[type=text]`).value.split("").reverse().join("");
            }}/>
            <h2>${revText}</h2>
        </div>
    `;
}
```

```javascript
const C2DApp = $ => {

    const canvasOnload = ({ target: canvas }) => {

        const ctx = canvas.getContext("2d");
        // ...
    };

    return html => html`
        <canvas @load=${canvasOnload}></canvas>
    `;
}
```

```javascript
const FrameMode = $ => {

    let count = 0;

    return h => h`<button @click=${() => count++}>${count}</button>`;
    // refresh every frame with requestAnimationFrame()
}

const SetMode = $ => {

    const { set } = $; // switching into "set" mode
    
    let count = 0;

    return html => html`
        <button @click=${() => set(count++)}>${count}</button>
    `;
    // refresh when set() called, which reduces unchanged calls
}
```