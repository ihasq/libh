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
  html: () => html
});
module.exports = __toCommonJS(libh_exports);

// src/core.js
var _buffer, _a;
globalThis.libh = Object.freeze(new (_a = class {
  constructor() {
    __privateAdd(this, _buffer, {
      frameLoop: {
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
          if (Frameloop.func.stack.length !== 0) {
            for (let i = 0; i < Frameloop.func.stack.length; i++) {
              if (Frameloop.func.stack[i].result !== Frameloop.func.stack[i].funcBody()) {
              }
            }
          }
          if (Frameloop.task.stack.length !== 0) {
            for (let i = 0; i < Frameloop.task.stack.length; i++) {
              Frameloop.task.stack[i]();
            }
          }
          ;
          Frameloop.task.stack = [];
          window.requestAnimationFrame(Frameloop.run);
        }
      },
      pluginRegistry: /* @__PURE__ */ Object.create(null),
      viewModel: /* @__PURE__ */ Object.create(null)
    });
  }
  get version() {
    return "0.0.16";
  }
  /**
   * 
   * krmbn0576 さんに感謝します: Qiita記事「JavaScriptのフックパターンの楽な書き方」
   * https://qiita.com/krmbn0576/items/473e18e182972b41dd1b
   * 
   * @param { function } BASE_CLASS
   * @param { string } TARGET
   * @param { function } ADDITION
   * 
   */
  appendHook(BASE_CLASS, TARGET, ADDITION) {
    if (BASE_CLASS.prototype[TARGET]) {
      BASE_CLASS = BASE_CLASS.prototype;
    } else if (!BASE_CLASS[TARGET]) {
      throw new Error("Cannot find hook");
    }
    ;
    const ORIGIN = BASE_CLASS[TARGET];
    BASE_CLASS[TARGET] = function() {
      arguments[arguments.length] = ORIGIN;
      arguments.length++;
      return ADDITION.apply(this, arguments);
    };
  }
  getDeepCopy(objectData) {
    const KEY_DATA = Object.keys(objectData);
    const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
    for (let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
      RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = typeof objectData[KEY_DATA[objectKeyIndex]] === "object" ? getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]];
    }
    ;
    return RETURN_BUFFER;
  }
}, _buffer = new WeakMap(), _a)());
Object.defineProperty(globalThis, "libh", { configurable: false });

// src/html.js
libh.appendHook(Node, "appendChild", function() {
  const HAS_LIBH_FLAG = arguments[0].FLAG === "LIBH_INSTANCE";
  const LIBH_ELEMENT_NODE = arguments[0].getAsNode;
  arguments[arguments.length - 1].apply(
    this,
    HAS_LIBH_FLAG ? [LIBH_ELEMENT_NODE] : arguments
  );
  if (HAS_LIBH_FLAG) {
    return LIBH_ELEMENT_NODE;
  }
});
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
var BANNED_PROPERTY = [
  "prop",
  "super",
  "__proto__",
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__"
];
var HTML_FLAG = {
  "enable-node-return": false
};
var _buffer2;
var LibhNode = class extends String {
  constructor({ RENDER_TARGET_NONCE, STRINGS, KEYS }) {
    super(`<span id=${RENDER_TARGET_NONCE} hidden></span>`);
    __privateAdd(this, _buffer2, void 0);
    __privateSet(this, _buffer2, {
      INSTANCE_UUID: crypto.randomUUID(),
      RENDER_TARGET_NONCE,
      keyMap: "",
      funcList: [],
      portConfig: /* @__PURE__ */ Object.create(null),
      proxyRegistry: /* @__PURE__ */ Object.create(null),
      proxyHandleTemplate: {
        get(target, prop) {
          console.dir(target);
          if (prop in target) {
            console.log("already has");
            return target[prop];
          } else {
            const proxyRef = crypto.randomUUID();
            console.log("proxy created");
            target[prop] = /* @__PURE__ */ Object.create(null);
            return new Proxy(target[prop], this);
          }
        },
        set(target, prop, value) {
          target[prop] = value;
        }
      },
      elementProperty: {
        globalVariable: /* @__PURE__ */ Object.create(null),
        propReference: null
      }
    });
    for (let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
      __privateGet(this, _buffer2).keyMap += STRINGS[keyIndex];
      if (keyIndex + 1 !== STRINGS.length) {
        switch (typeof KEYS[keyIndex]) {
          case "function":
            __privateGet(this, _buffer2).keyMap += ` \${${__privateGet(this, _buffer2).INSTANCE_UUID}:${keyIndex}} `;
            if (KEYS[keyIndex].constructor.name !== "Function") {
              throw new Error("Can not use async function");
            } else {
              const typeMap = libh.getDeepCopy(KEYS[keyIndex](new Proxy({}, __privateGet(this, _buffer2).proxyHandleTemplate)));
              const resultBuffer = KEYS[keyIndex](typeMap);
              resultBuffer.onclick();
              console.log(typeMap);
            }
            ;
            break;
          case "object":
            __privateGet(this, _buffer2).keyMap += ` \${${__privateGet(this, _buffer2).INSTANCE_UUID}:${keyIndex}} `;
            __privateGet(this, _buffer2).portConfig = KEYS[keyIndex];
            for (let banIndex = 0; banIndex < BANNED_PROPERTY.length; banIndex++) {
              delete __privateGet(this, _buffer2).portConfig[BANNED_PROPERTY[banIndex]];
            }
            ;
            __privateGet(this, _buffer2).portConfig.onclick(__privateGet(this, _buffer2).portConfig);
            console.log(__privateGet(this, _buffer2).portConfig);
            break;
          default:
            __privateGet(this, _buffer2).keyMap += KEYS[keyIndex];
        }
        ;
      }
      ;
    }
    ;
    console.log(__privateGet(this, _buffer2).keyMap);
    setTimeout(function() {
      const TARGET = document.getElementById(RENDER_TARGET_NONCE);
      if (!TARGET) {
        console.log(`instance created: ${__privateGet(this, _buffer2).INSTANCE_UUID}`);
        __privateGet(this, _buffer2).returnObject.flag = void 0;
      } else {
        console.log("html appended");
        TARGET.removeAttribute("id");
        TARGET.removeAttribute("hidden");
      }
      ;
    }, 0);
  }
  get FLAG() {
    return "LIBH_INSTANCE";
  }
  get getAsNode() {
    const RETURN_NODE = document.createElement("span");
    RETURN_NODE.innerText = Date.now();
    RETURN_NODE.id = __privateGet(this, _buffer2).RENDER_TARGET_NONCE;
    return RETURN_NODE;
  }
};
_buffer2 = new WeakMap();
function html(STRINGS, ...KEYS) {
  return new LibhNode({
    RENDER_TARGET_NONCE: crypto.randomUUID(),
    STRINGS,
    KEYS
  });
}
Object.assign(html, {
  get reservedKey() {
    return [
      "global",
      "shared",
      "prop",
      "this",
      "static",
      "method",
      "meta",
      "event",
      "onclick",
      "onchange"
    ];
  },
  get info() {
    return {
      "package": "libh",
      "cdn": "npm",
      "module": "html",
      "version": "0.0.16",
      "available-flags": Object.keys(HTML_FLAG)
    };
  }
});
html.flag = function(...flag) {
  for (const FLAG_INDEX of flag) {
    if (FLAG_INDEX in HTML_FLAG && !HTML_FLAG[FLAG_INDEX]) {
      HTML_FLAG[FLAG_INDEX] = true;
    }
    ;
  }
  ;
};
Object.assign(html.flag, {
  get list() {
    return Object.keys(HTML_FLAG);
  },
  get state() {
    return JSON.parse(JSON.stringify(HTML_FLAG));
  }
});

// src/css.js
function css(strings, ...keys) {
}
