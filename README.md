# [libh.js](https://libh.js.org)

[![npm](https://img.shields.io/npm/v/libh?logo=npm&label=%20&labelColor=%23eee)](https://www.npmjs.com/package/libh)
![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh?logo=github)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
const Main = () => {
    let count = 0;
    
    return html => html`
        <body>
            <p>You clicked ${count} times</p>
            <button @click=${() => count++};>
                Click me
            </button>
        </body>
    `;
}

// Write Into The DOM Or An Emulator Directly

const write = await import("https://esm.sh/@libh/write");

write(Main); // to globalThis.document.body
```

**libh.js** is a JavaScript library for empowering the DOM manipulation.\
less boilerplate, safe, built on top of standard html reference.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Installation

#### CDN (Browser, Deno)
```javascript
import write from 'https://esm.sh/@libh/write';
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

        <!-- identifier (not the id attribute) -->
        <img #mainImgRef/>

        <!-- event handler -->
        <button @click=${() => console.log("clicked")}; />
        <input @@keydown=${() => console.log("cancelled")}; /> <!-- preventDefault() -->

        <!-- style -->
        <h1 *color=${titleColor}></h1>

        <!-- property -->
        <input #inputWithProp type=text; .value=ok; />

        <input type=checkbox; .value=${true}; /> <!-- CORRECT type forcing -->
        <input type=checkbox; .value=true; /> <!-- This is NOT boolean -->

        <!-- child component -->
        <${DefinedComponent} my-attribute=1; />

        <!-- custom attribute -->
        <div ${name}=taro;></div>

        <!-- branching with psuedo class or boolean -->
        <button *color:hover=red; *color:${someBoolean}=blue;></button>

        <!-- psuedo class nesting -->
        <button
            #hasNested

            :hover {
                *color=red;
            };

            :${someBoolean} {
                *color=blue;
            };
        ></button>
    </div>
`;

$`#inputWithProp`.get`.value` === $`#inputWithProp`.value; // true
$`button`.get`@click`; // () => console.log("clicked")
$`#hasNested`.get`*color:hover`; // 'blue'

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

### Select Your Writing Mode
```javascript
const FrameMode = $ => {
    let count = 0; // this is a "frame" mode

    return html => html`
        <button @click=${() => count++};>${count}</button>
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

const PtrMode = $ => {
    const { ptr } = $.std; // switching into "pointer" mode
    
    let count = ptr(0); // create modifiable pointer

    return html => html`
        <button @click=${() => count.v++}>${count}</button>
    `;
    // refresh only where pointer object got set (most performant)
}
```

### Usage
```javascript
import write from "@libh/write";

const Count = $ => {
    const { ptr } = $.std;

    const
        count = ptr(0),
        buttonText = ptr('Hover me!'),

        isHovering = $ => () => {
            buttonText.v = $.value? 'Click me!' : 'Hover me!'
        };

    return html => html`
        <div>
            <p>You clicked ${count} times</p>
            <button
                @click=${() => count.v++};
                ${isHovering}=${false};

                :hover {
                    *background-color=red;
                    *color=white;
                    ${isHovering}=${true};
                }
            >
                ${buttonText}
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
            <${Counter} #counter/>
            <button @click=${() => $`#counter`.click()};>Bring some more...</button>
        </body>
    `;
}
```

```javascript

const TodoApp = $ => {
    const { ptr } = $.std;

    const inputPlaceholder = ptr("", true);

    const TodoRow = $ => {
        const { ptr } = $.std;

        const editableTextnode = ptr($.value, true); // create contenteditable=plaintext-only

        return html => html`
            <div @blur=${() => editableTextnode.close()}>
                <span @blur=${() => editableTextnode.close()}>${editableTextnode}</span>

                <button @click=${() => editableTextnode.open()}>edit</button>
                <button @click=${() => $.element.remove()}>delete</button>
                <button @click=${() => $.swap("above")}>swap with above</button>
                <button @click=${() => $.swap("below")}>swap with below</button>
            </div>
        `;
    }

    return html => html`
        <div *background-color=#red; *color=white;>
            <ul #todoList></ul>
            <input #todoInput; type=text; value=${inputPlaceHolder}/>
            <input type=button; @click=${() => {
                $`#todoList`.push($ => html => html`
                    <${TodoRow} .value=${inputPlaceHolder.v}/>
                `);
                inputPlaceHolder.v = "";
            }};/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {
    const { ptr } = $.std;

    const
        revText = ptr(""),
        textValuePtr = ptr("", true);

    return html => html`
        <div>
            <input
                #stringInput
                type=text;
                .value=${textValuePtr};
                @keydown=${async () => revText.v = value.split("").reverse().join("")}
            />
            <h2>${revText}</h2>
        </div>
    `;
}
```

```javascript
const C2DApp = $ => html => html`
    <canvas @load=${({ target: canvas }) => {
        const ctx = canvas.getContext("2d");
        // ...
    }};></canvas>
`;
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