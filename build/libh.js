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
var LibhIdentifier = class extends String {
  constructor({ uuid }) {
    super(`<span id=${uuid} hidden></span>`);
    this.FLAG = "LIBH_INSTANCE";
    this.getAsNode = () => {
      const RETURN_NODE = document.createElement("span");
      RETURN_NODE.innerText = Date.now();
      RETURN_NODE.id = uuid;
      return RETURN_NODE;
    };
  }
};

// src/html.js
function hook(BASE_CLASS, TARGET, ADDITION) {
  if (BASE_CLASS.prototype[TARGET])
    BASE_CLASS = BASE_CLASS.prototype;
  else if (!BASE_CLASS[TARGET])
    throw new Error("Cannot find hook");
  const ORIGIN = BASE_CLASS[TARGET];
  BASE_CLASS[TARGET] = function() {
    arguments[arguments.length] = ORIGIN;
    arguments.length++;
    return ADDITION.apply(this, arguments);
  };
}
hook(Node, "appendChild", function() {
  const HAS_LIBH_FLAG = arguments[0].FLAG === "LIBH_INSTANCE";
  const LIBH_ELEMENT_NODE = arguments[0].getAsNode();
  arguments[arguments.length - 1].apply(
    this,
    HAS_LIBH_FLAG ? [LIBH_ELEMENT_NODE] : arguments
  );
  if (HAS_LIBH_FLAG && HTML_FLAG["enable-node-return"]) {
    return LIBH_ELEMENT_NODE;
  }
});
var HTML_FLAG = {
  "enable-node-return": false
};
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function createHTMLInstance({ STRINGS, KEYS }) {
  const BUFFER = {
    INSTANCE_UUID: window.crypto.randomUUID(),
    RENDER_TARGET_UUID: window.crypto.randomUUID(),
    returnObject: /* @__PURE__ */ Object.create(null),
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
    BUFFER.keyMap += STRINGS[keyIndex];
    if (keyIndex + 1 !== STRINGS.length) {
      switch (typeof KEYS[keyIndex]) {
        case "function":
          BUFFER.keyMap += ` \${${BUFFER.INSTANCE_UUID}:${keyIndex}} `;
          if (KEYS[keyIndex].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            const typeMap = getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER.proxyHandleTemplate)));
            const resultBuffer = KEYS[keyIndex](typeMap);
            resultBuffer.onclick();
            console.log(typeMap);
          }
          ;
          break;
        case "object":
          BUFFER.keyMap += ` \${${BUFFER.INSTANCE_UUID}:${keyIndex}} `;
          BUFFER.portConfig = KEYS[keyIndex];
          if ("prop" in BUFFER.portConfig) {
            throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved");
          }
          ;
          if ("global" in BUFFER.portConfig) {
            BUFFER.portConfig.global = getDeepCopy(BUFFER.portConfig.global);
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
    ;
  }
  ;
  console.log(BUFFER.keyMap);
  BUFFER.returnObject = new LibhIdentifier({ uuid: BUFFER.RENDER_TARGET_UUID });
  setTimeout(function() {
    const TARGET = document.getElementById(BUFFER.RENDER_TARGET_UUID);
    if (!TARGET) {
      console.log(`instance created: ${BUFFER.INSTANCE_UUID}`);
      BUFFER.returnObject.flag = void 0;
    } else {
      console.log("html appended");
      TARGET.removeAttribute("id");
      TARGET.removeAttribute("hidden");
    }
    ;
  }, 0);
  return BUFFER.returnObject;
}
function html(STRINGS, ...KEYS) {
  return createHTMLInstance({ STRINGS, KEYS });
}
Object.assign(html, {
  getReservedKey: [
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
  ],
  flag() {
    for (const FLAG_INDEX of arguments) {
      if (FLAG_INDEX in HTML_FLAG && !HTML_FLAG[FLAG_INDEX]) {
        HTML_FLAG[FLAG_INDEX] = true;
      }
      ;
    }
    ;
  }
});

// src/css.js
function css(strings, ...keys) {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  css,
  html
});
