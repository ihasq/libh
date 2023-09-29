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

// src/libh.js
var libh_exports = {};
__export(libh_exports, {
  css: () => css,
  html: () => html
});
module.exports = __toCommonJS(libh_exports);

// src/core.js
function getDeepCopy(objectData) {
  const KEY_DATA = Object.keys(objectData);
  const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
  for (let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
    RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = typeof objectData[KEY_DATA[objectKeyIndex]] === "object" ? getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]];
  }
  ;
  return RETURN_BUFFER;
}

// src/html.js
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {
  const BUFFER = {
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
          const proxyRef = window.crypto.randomUUID();
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
    },
    portProperty: {}
  };
  for (let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
    BUFFER.keyMap += encodeURI(STRINGS[keyIndex]);
    if (keyIndex + 1 !== STRINGS.length) {
      switch (typeof KEYS[keyIndex]) {
        case "function":
          if (KEYS[keyIndex].constructor.name !== "Function") {
            BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
            throw new Error("Can not use async function");
          } else {
          }
          ;
          break;
        case "object":
          BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
          BUFFER.portConfig = KEYS[keyIndex];
          if ("global" in BUFFER.portConfig) {
            BUFFER.portConfig.global = getDeepCopy(BUFFER.portConfig.global);
          }
          ;
          if ("prop" in BUFFER.portConfig) {
            throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved");
          }
          ;
          BUFFER.portConfig.onclick(BUFFER.portConfig);
          console.log(BUFFER.portConfig);
          break;
        default:
          BUFFER.keyMap += KEYS[keyIndex];
      }
      ;
    }
  }
  ;
}
function html(STRINGS, ...KEYS) {
  const INSTANCE_UUID = window.crypto.randomUUID();
  const RENDER_TARGET_UUID = window.crypto.randomUUID();
  const HTML_INSTANCE = Object.assign(new String("<span id=" + RENDER_TARGET_UUID + " hidden></span>"), {
    LIBH_UUID: INSTANCE_UUID
  });
  setTimeout(() => {
    const TARGET = document.getElementById(RENDER_TARGET_UUID);
    if (!TARGET) {
      console.log(`instance created: ${INSTANCE_UUID}`);
    } else {
      console.log("html appended");
      const APPEND_TARGET = TARGET.parentElement;
      TARGET.remove();
      createHTMLInstance(window.crypto.randomUUID(), STRINGS, KEYS);
    }
    ;
  }, 0);
  return HTML_INSTANCE;
}
html.getReservedKey = [
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

// src/css.js
function css(strings, ...keys) {
}
