// src/core.js
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
export {
  frameloop,
  getStaticUUID
};
