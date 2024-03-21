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
        <div>
            <p>You clicked ${count} times</p>
            <button @click=${() => count++}>
                Click me
            </button>
        </div>
    `;
}

const { write, define, serve } = await import("https://esm.sh/libh");

// Write Into The DOM Or An Emulator Directly

write(document.body, Count);

// Define As Web Components

define("counter-thing", Count);

// Build SSG Pipeline On Server-side Runtime

serve("/", Count);
```

HTML in JavaScript.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Installation

#### CDN (Browser, Deno)
```javascript
const libh = await import("https://esm.sh/libh"); // recommended
```

#### NPM (Node.js)
```sh
npm i libh
```

### Build From Source
```sh
git clone https://github.com/ihasq/libh
deno task build
```

### Smart Attributes
```javascript
// text
html`<label>${text}</label>`;

// attribute
html`<iframe src=${formURL}/>`;

// event handler
html`<button @click=${() => alert("clicked")}/>`;

// style
html`<h1 *color=${titleColor}></h1>`;

// property
html`<input type="text" .value=${value}/>`;

// boolean
html`<input type="checkbox" ?checked=${isChecked}/>`;

// identifier (not the id attribute)
html`<input #checkboxRef type=checkbox .value=true/>`;
$`#checkboxRef`.value // true

// component
html`<${DefinedComponent} my-attribute=1/>`;

// context
html`<${DefinedContext}>
    <label></label>
</${DefinedContext}>`

// bundled
const linkTo = targetURL => ({
    href: targetURL,
    target: "_blank",
    rel: "noopener noreferrer"
})

html`<a ${linkTo}="https://ihasq.com"/>`;
```

### Usage
```javascript
import { write } from "libh";

const Count = $ => {
    const { set } = $

    let count = 0,
        btnHoverStyle = () => ({
            '*background-color': $`#clicker`.is.hover? 'red' : null,
            '*color': $`#clicker`.is.hover? 'white' : null
        });
    
    return html => html`
        <div>
            <p>You clicked ${count} times</p>
            <button
                #clicker
                @click=${() => set(count++)}
                ${btnHoverStyle}
            >
                ${$`#clicker`.is.hover? 'Click' : 'Hover'} me
            </button>
        </div>
    `;
}

write(document.body, Count)
```

```javascript

const Counter = () => {

    let count = 0;

    return html => html`
        <button @click=${() => count++} .count=${count}>
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
```

```javascript
const TodoRow = ({ pr: { el, remove }}) => html => html`
    <div>
        <span>${el}</span>
        <button @click=${remove}>delete</button>
    </div>
`;

const TodoList = $ => {

    const todoMap = $.map((el, id) => html => html`
        <${TodoRow} .el=${el} .remove=${() => delete todoMap[id]}/>
    `);

    return html => html`
        <div
            *background-color=#${Math.floor((Math.sin(Date.now()) + 1) / 2 * 0xffffff).toString(16).padStart(6, "0")}
            *color=white
        >
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

    return html => html`
        <button @click=${() => count++}>${count}</button>
    `;
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