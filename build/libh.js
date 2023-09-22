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
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/libh.js
var libh_exports = {};
__export(libh_exports, {
  css: () => css,
  document: () => document,
  html: () => html,
  sass: () => sass,
  scss: () => scss
});
module.exports = __toCommonJS(libh_exports);

// src/core/getKeyIdentifier.js
var generateInstanceId = function() {
  return (Math.floor(Math.random() * (32 ** 6 - 32 ** 5 - 1)) + 32 ** 5).toString(32);
};

// src/util/TurboArray.js
var _private;
var TurboArray = class {
  constructor() {
    __privateAdd(this, _private, void 0);
    __privateSet(this, _private, {
      table: /* @__PURE__ */ Object.create(null),
      length: 0
    });
  }
  at(arrayIndex) {
    if (__privateGet(this, _private).length) {
      return __privateGet(this, _private).table[arrayIndex % __privateGet(this, _private).length];
    } else {
      return void 0;
    }
  }
  push(property) {
    __privateGet(this, _private).table[__privateGet(this, _private).length] = property;
    __privateGet(this, _private).length++;
  }
  flush() {
    __privateGet(this, _private).length = 0;
  }
  forEach(callbackFn) {
  }
  get length() {
    return __privateGet(this, _private).length;
  }
};
_private = new WeakMap();

// src/core/frameloop.js
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
    stack: new TurboArray(),
    pendedDiff: /* @__PURE__ */ Object.create(null)
  },
  task: {
    stack: new TurboArray()
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
        if (frameloop.func.stack.at(i).result !== frameloop.func.stack.at(i).funcBody()) {
        }
      }
    }
    if (frameloop.task.stack.length !== 0) {
      for (let i = 0; i < frameloop.task.stack.length; i++) {
        frameloop.task.stack.at(i)();
      }
    }
    ;
    frameloop.task.stack.flush();
    window.requestAnimationFrame(frameloop.run);
  }
};

// src/html/html.js
var parseBuffer = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function createHTMLInstance(instanceId, strings, keys) {
  const buffer = {
    keyMap: ""
  };
  for (let index = 0; index < strings.length; index++) {
    buffer.keyMap += strings[index];
    if (index + 1 !== strings.length) {
      buffer.keyMap += ` \${${instanceId}:${index}} `;
      switch (typeof keys[index]) {
        case "function":
          if (keys[index].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
          }
          break;
        case "object":
          throw new Error("dumb ass");
        default:
      }
      ;
    }
  }
  ;
  console.log(buffer.keyMap);
  const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]\\} `, "g");
  const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
    buffer.keyMap.slice(buffer.keyMap.indexOf("{") + 1, buffer.keyMap.lastIndexOf("}")),
    "text/html"
  ).body;
  console.dir(TEMPLATE.children);
  parseBuffer.registry[instanceId] = Object.assign(buffer, {
    instanceId,
    keys: {}
  });
}
function html(strings, ...keys) {
  createHTMLInstance(generateInstanceId(), strings, keys);
  return;
}
html.getReservedKey = [
  "shared",
  "prop",
  "this",
  "static",
  "method",
  "meta"
];

// src/css.js
function css(strings, ...keys) {
}

// src/scss/scss.js
function scss(strings, ...keys) {
}

// src/sass.js
function sass(strings, ...keys) {
}

// src/document.js
var document = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  css,
  document,
  html,
  sass,
  scss
});
