// src/core.js
var STATIC_UUID = {
  registry: /* @__PURE__ */ Object.create(null),
  index: 0,
  reset() {
    for (let i = 0; i < 256; i++) {
      this.registry[i] = crypto.randomUUID();
    }
    ;
    this.index = 0;
  }
};
STATIC_UUID.reset();

// src/css.js
function css(strings, ...keys) {
}
export {
  css
};
