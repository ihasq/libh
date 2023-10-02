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
var libh_exports = {};
__export(libh_exports, {
  html: () => html
});
module.exports = __toCommonJS(libh_exports);
[
  {
    BASE_CLASS: Node,
    TARGET: "appendChild",
    ADDITION: function() {
      const HAS_LIBH_FLAG = arguments[0].constructor.name === "String" && arguments[0].FLAG === "LIBH_INSTANCE";
      const LIBH_ELEMENT_NODE = arguments[0].getAsNode;
      arguments[arguments.length - 1].apply(
        this,
        HAS_LIBH_FLAG ? [LIBH_ELEMENT_NODE] : arguments
      );
      if (HAS_LIBH_FLAG) {
        return LIBH_ELEMENT_NODE;
      }
    }
  }
].forEach(function({ BASE_CLASS, TARGET, ADDITION }) {
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
});
const UTIL = {
  getDeepCopy(objectData) {
    const KEY_DATA = Object.keys(objectData);
    const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
    for (let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
      RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = typeof objectData[KEY_DATA[objectKeyIndex]] === "object" ? this.getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]];
    }
    ;
    return RETURN_BUFFER;
  },
  HTMLParser: new DOMParser()
};
const QUERY = {
  BANNED_PROPERTY: [
    "prop",
    "super",
    "__proto__",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__"
  ],
  RESERVED_KEY: [
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
  ]
};
const BUFFER = {
  flags: {
    "enable-node-return": false
  },
  elementRegistry: /* @__PURE__ */ Object.create(null),
  createElement() {
    const INSTANCE_UUID = crypto.randomUUID();
    this.elementRegistry[INSTANCE_UUID] = {
      INSTANCE_UUID,
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
      },
      createRenderPath() {
        return {
          NONCE: crypto.randomUUID()
        };
      }
    };
    return this.elementRegistry[INSTANCE_UUID];
  }
};
function html(STRINGS, ...KEYS) {
  const BUFFER_PATH = BUFFER.createElement();
  const RENDER_PATH = BUFFER_PATH.createRenderPath();
  for (let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
    BUFFER_PATH.keyMap += STRINGS[keyIndex];
    if (keyIndex + 1 !== STRINGS.length) {
      switch (typeof KEYS[keyIndex]) {
        case "function":
          BUFFER_PATH.keyMap += ` \${${BUFFER_PATH.INSTANCE_UUID}:${keyIndex}} `;
          if (KEYS[keyIndex].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            const typeMap = UTIL.getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER_PATH.proxyHandleTemplate)));
            const resultBuffer = KEYS[keyIndex](typeMap);
            resultBuffer.onclick();
            console.log(typeMap);
          }
          ;
          break;
        case "object":
          BUFFER_PATH.keyMap += ` \${${BUFFER_PATH.INSTANCE_UUID}:${keyIndex}} `;
          BUFFER_PATH.portConfig = KEYS[keyIndex];
          for (let banIndex = 0; banIndex < QUERY.BANNED_PROPERTY.length; banIndex++) {
            delete BUFFER_PATH.portConfig[QUERY.BANNED_PROPERTY[banIndex]];
          }
          ;
          BUFFER_PATH.portConfig.onclick(BUFFER_PATH.portConfig);
          console.log(BUFFER_PATH.portConfig);
          break;
        default:
          BUFFER_PATH.keyMap += KEYS[keyIndex];
      }
      ;
    }
    ;
  }
  ;
  setTimeout(function() {
    const TARGET = document.getElementById(RENDER_PATH.NONCE);
    if (!TARGET) {
      console.log(`instance created: ${BUFFER_PATH.INSTANCE_UUID}`);
      BUFFER_PATH.returnObject.flag = void 0;
    } else {
      console.log("html appended");
      TARGET.removeAttribute("id");
      TARGET.removeAttribute("hidden");
    }
    ;
  }, 0);
  return Object.assign(new String(`<span id=${RENDER_PATH.NONCE} hidden></span>`), {
    get FLAG() {
      return "LIBH_INSTANCE";
    },
    get getAsNode() {
      const RETURN_NODE = document.createElement("span");
      RETURN_NODE.innerText = Date.now();
      RETURN_NODE.id = RENDER_PATH.NONCE;
      return RETURN_NODE;
    }
  });
}
Object.assign(html, {
  get reservedKey() {
    return QUERY.RESERVED_KEY;
  },
  get info() {
    return {
      "package": "libh",
      "cdn": "npm",
      "module": "html",
      "version": "0.0.16",
      "available-flags": Object.keys(BUFFER.flags)
    };
  }
});
html.flag = function(...flag) {
  for (const FLAG_INDEX of flag) {
    if (FLAG_INDEX in BUFFER.flags && !BUFFER.flags[FLAG_INDEX]) {
      BUFFER.flags[FLAG_INDEX] = true;
    }
    ;
  }
  ;
};
Object.assign(html.flag, {
  get list() {
    return Object.keys(BUFFER.flags);
  },
  get state() {
    return JSON.parse(JSON.stringify(BUFFER.flags));
  }
});
