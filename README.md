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
return html => html`
    <div>
        <!-- text -->
        <label>${text}</label>

        <!-- attribute -->
        <iframe src=${formURL}/>

        <!-- event handler -->
        <button @click=${() => alert("clicked")}/>
        <input @^keydown=${() => alert("cancelled")}/> <!-- preventDefault() -->

        <!-- style -->
        <h1 *color=${titleColor}></h1>

        <!-- property -->
        <input type="text" .value=${value}/>

        <!-- identifier (not the id attribute) -->
        <input #checkboxRef type=checkbox .value=true/>

        <!-- child component -->
        <${DefinedComponent} my-attribute=1/>

        <!-- branching with psuedo class -->
        <button *color:hover=red *color:active=blue></button>

        <!-- psuedo class nesting -->
        <button
            :hover {
                *color=red
                :active {
                    *color=blue
                }
            }
        ></button>

    </div>
`;

```

### Standard Directives
```javascript
$.std = {
    set(value) { /* ... */ },
    ptr(setup, setCallbackFn, getCallbackFn) { /* ... */ },
    map(templateFn) { /* ... */ },
}
```

### Usage
```javascript
import { write } from "libh";

const Count = $ => {
    const { ptr } = $.std

    const count = ptr(0);
    const isHovering = ptr(false);

    return html => html`
        <div>
            <p>You clicked ${count} times</p>
            <button
                @click=${() => count.v++}
                ?${isHovering}=false
                :hover {
                    *background-color=red
                    *color=white
                    ?${isHovering}=true
                }
            >
                ${isHovering.v? 'Click' : 'Hover'} me
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
            <p>👇 She got clicked ${$`#counter`.count} times</p>
            <${Counter} #counter/>
            <button @click=${() => $`#counter`.click()}>Bring some more...</button>
        </body>
    `;
}
```

```javascript
const TodoRow = ({ el, remove }) => html => html`
    <div>
        <span>${el}</span>
        <button @click=${remove}>delete</button>
    </div>
`;

const TodoList = $ => {
    const { map, ptr } = $.std;

    const todoMap = map((el, id) => html => html`
        <${TodoRow} .el=${el} .remove=${() => delete todoMap[id]}/>
    `);

    const [ todoValue ] = ptr();

    return html => html`
        <div
            *background-color=#${Math.floor((Math.sin(Date.now()) + 1) / 2 * 0xffffff).toString(16).padStart(6, "0")}
            *color=white
        >
            <ul ${map}=${todoMap}></ul>
            <input type=text .value=${todoValue} />
            <input type=button @click=${async () => {
                todoMap.push(todoValue.value);
                todoValue.reset();
            }}/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {
    const { ptr } = $.std;

    let revText = "";

    const textValuePtr = ptr("", value => {
        revText = value.split("").reverse().join("");
    });

    return html => html`
        <div>
            <input type="text" .value=${textValuePtr}/>
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

    const { set } = $.std; // switching into "set" mode
    
    let count = 0;

    return html => html`
        <button @click=${() => set(count++)}>${count}</button>
    `;
    // refresh when set() called, which reduces unchanged calls
}

const PointerMode = $ => {

    const { ptr, h: html } = $.std; // switching into "pointer" mode
    
    const count = ptr(0, {
        set: newValue => console.log(`counter updated: ${newValue}`)
    });

    return html`
        <button @click=${() => count.v++}>${count}</button>
    `;
    // refresh where pointer value changed, which reduces calls of unchanged primitives (most performant)
    // this component could describe itself as single-order function
}
```