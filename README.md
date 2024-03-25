# [libh.js](https://libh.js.org)

[![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)](https://www.npmjs.com/package/libh)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
const Count = () => {

    let count = 0;
    
    return html => html`
        <div>
            <p>You clicked ${count} times</p>
            <button @click=${() => count++};>
                Click me
            </button>
        </div>
    `;
}

// Write Into The DOM Or An Emulator Directly

import("https://esm.sh/@libh/write")
    .then(write => write(document.body, Count));
```

**libh.js** is a JavaScript library for empowering the DOM manipulation.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Installation

#### CDN (Browser, Deno)
```javascript
const write = await import("https://esm.sh/@libh/write");
```

#### NPM (Node.js)
```sh
npm i @libh/write
```

### Build From Source
```sh
git clone https://github.com/ihasq/libh
deno task build
```

### Smart Attributes on libh.js
```javascript
return html => html`
    <div>
        <!-- text -->
        <label>${text}</label>

        <!-- attribute -->
        <iframe src=${formURL}; />

        <!-- event handler -->
        <button @click=${() => console.log("clicked")}; />
        <input @@keydown=${() => console.log("cancelled")}; /> <!-- preventDefault() -->

        <!-- style -->
        <h1 *color=${titleColor}></h1>

        <!-- property -->
        <input type=text; .value=ok; />

        <input type=checkbox; .value=${true}; /> <!-- CORRECT type forcing -->
        <input type=checkbox; .value=true; /> <!-- This is NOT boolean -->

        <!-- identifier (not the id attribute) -->
        <img #mainImgRef/>

        <!-- child component -->
        <${DefinedComponent} my-attribute=1; />

        <!-- branching with psuedo class -->
        <button *color:hover=red; *color:active=blue;></button>

        <!-- psuedo class nesting -->
        <button
            #hasNested

            :hover {
                *color=red;
            };

            :active {
                *color=blue;
            };
        ></button>

        <!-- force to all children (same as * selector) -->
        <div *color*=${forcedColor}></div>
        <div @mouseover*=${({ target }) => console.log(target)}></div>
    </div>
`;

$`button`.get`@click`; // () => console.log("clicked")
$`#hasNested:hover`.get`*color`; // 'blue'

```

### Directives
```javascript
$.std = {
    ptr(setup, setCallbackFn, getCallbackFn) {
        /* create pointer */
    },

    get set() {
        /* forces 'set mode' to component */
        return function(value) {
            /* it calls html function when its called */
            return value
        }
    },

    map(templateFn) {
        /* create map */
        return {
            push(initValue) {}
        }
    },
}
```

### Usage
```javascript
import write from "@libh/write";

const Count = $ => {
    const { ptr } = $.std;

    let count = 0,
        buttonText = '';

    const isHovering = $ => () => {
        buttonText = $.value? 'Click me!' : ''
    }

    return html => html`
        <div>
            <p>You clicked ${count} times</p>
            <button
                @click=${() => count++};
                ${isHovering}=${false};

                :hover {
                    *background-color=red;
                    *color=white;
                    ${isHovering}=${true};
                }
            >
                ${buttonText || 'Hover me!'}
            </button>
        </div>
    `;
}

write(document.body, Count);
```

```javascript
const Counter = () => {

    let count = 0;

    return html => html`
        <button @click=${() => count++}; .count=${count};>
            I got clicked ${count} times!
        </button>
    `;
}

const Main = $ => {
    return html => html`
        <body>
            <p>👇 She got clicked ${$`#counter`.count} times</p>
            <${Counter} #counter;/>
            <button @click=${() => $`#counter`.click()};>Bring some more...</button>
        </body>
    `;
}
```

```javascript

const TodoApp = $ => {

    const TodoRow = $ => {
        let isEditable = false;

        return html => html`
            <div @blur=${() => isEditable = false};>
                <span contenteditable=${isEditable};>${$.el}</span>
                <button @click=${$.remove};>delete</button>
            </div>
        `;
    }

    const addTodo = async () => {
        const todoValue = $`#todoInput`.value;

        $`#todoList`.push(html => html`
            <${TodoRow} #todoValue-${todoValue} .value=${todoValue}>
        `);

        $`#todoInput`.value = "";
    };

    return html => html`
        <div
            *background-color=#${Math.floor((Math.sin(Date.now()) + 1) / 2 * 0xffffff).toString(16).padStart(6, "0")};
            *color=white;
        >
            <ul #todoList></ul>
            <input #todoInput; type=text; />
            <input type=button; @click=${addTodo};/>
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
            <input type=text; .value=${textValuePtr};/>
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
        <canvas @load=${canvasOnload};></canvas>
    `;
}
```

```javascript
const FrameMode = $ => {

    let count = 0;

    return html => html`
        <button @click=${() => count++};>${count}</button>
    `;
    // refresh every frame with requestAnimationFrame()
}

const SetMode = $ => {

    const { set } = $.std; // switching into "set" mode
    
    let count = 0;

    return html => html`
        <button @click=${() => set(count++)};>${count}</button>
    `;
    // refresh when set() called, which reduces unchanged calls
}
```

```javascript
import nitro from 'https://esm.sh/@libh/nitro'
// Nitro - The Design System By libh.js

const StyleImport = () => {
    return html => html`
        <div>
            <button ${nitro}=system;>I am themed by Nitro from libh.js!</button>
        </div>
    `
}
```

```javascript
/*
    $ = {
        value: value from attribute
        element: element reference
    }
*/

const sampleAttrModule = $ => attr => attr`
    *background-color=${$.value === 'system'
        ? '#000'
        : $.value === 'dark'
            ? '#fff'
            : '#000'
    }
    *color=red;
    ${anotherAttrModule}=${true}

    :hover {
        *color=blue;
    };
`;

const WithAttributeModule = () => html => html`
    <div>
        <button ${sampleAttrModule}=system; />
    </div>
`
```

```javascript
import react from '@libh/react';
import { Button } from "@shadcn/ui/components/ui/button"

const ReactEmbedded = () => html => html`
    <div>
        <${Button} ${react}>I am the Button from @shadcn/ui in libh.js!</${Button}>
    </div>
`;
```