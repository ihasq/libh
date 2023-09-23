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

// src/scss.js
function scss(strings, ...keys) {
}
export {
  scss
};
