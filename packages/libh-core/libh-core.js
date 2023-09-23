var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core.js
var core_exports = {};
__export(core_exports, {
  frameloop: () => frameloop,
  getStaticUUID: () => getStaticUUID
});
module.exports = __toCommonJS(core_exports);
var frameloop = {
  isActive: false,
  rafID: "",
  ignite() {
    if (!this.isActive) {
      this.rafID = window.requestAnimationFrame(this.run);
      this.isActive = true;
    }
    ;
  },
  cancel() {
    window.cancelAnimationFrame(this.rafID);
    this.rafID = "";
    this.isActive = false;
  },
  func: {
    stack: [],
    pendedDiff: /* @__PURE__ */ Object.create(null)
  },
  task: {
    stack: []
  },
  registerNewFunction(keyFn) {
    this.func.stack.push({
      funcBody: keyFn,
      result: null
    });
  },
  pushNewTask(taskFn) {
    this.task.stack.push(taskFn);
  },
  run() {
    if (frameloop.func.stack.length !== 0) {
      for (let i = 0; i < frameloop.func.stack.length; i++) {
        if (frameloop.func.stack[i].result !== frameloop.func.stack[i].funcBody()) {
        }
      }
    }
    if (frameloop.task.stack.length !== 0) {
      for (let i = 0; i < frameloop.task.stack.length; i++) {
        frameloop.task.stack[i]();
      }
    }
    ;
    frameloop.task.stack = [];
    window.requestAnimationFrame(frameloop.run);
  }
};
if (!window.libh) {
  window.libh = {};
}
var STATIC_UUID = {
  registry: /* @__PURE__ */ Object.create(null),
  index: 0,
  reset() {
    for (let i = 0; i < 256; i++) {
      this.registry[i] = window.crypto.randomUUID();
    }
    ;
    this.index = -1;
  }
};
function getStaticUUID() {
  if (STATIC_UUID.index === 254) {
    setTimeout(STATIC_UUID.reset, 0);
  }
  ;
  STATIC_UUID.index++;
  return STATIC_UUID.registry[STATIC_UUID.index];
}
STATIC_UUID.reset();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  frameloop,
  getStaticUUID
});
