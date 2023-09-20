# ``libh - html in javascript``
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://ihasq.com)

```javascript
import { html } from "libh";

document.body.innerHTML = html`{
    <h1>Current date is ${Date}</h1>
}`();
```