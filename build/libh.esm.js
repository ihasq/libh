var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
function appendHook(BASE_CLASS, TARGET, ADDITION) {
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

// src/html.js
var HTML_FLAG = {
  "enable-node-return": false
};
appendHook(Node, "appendChild", function() {
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
var LibhBuffer = class {
  constructor({ RENDER_TARGET_NONCE }) {
    __publicField(this, "INSTANCE_UUID", crypto.randomUUID());
    __publicField(this, "RENDER_TARGET_NONCE");
    __publicField(this, "keyMap", "");
    __publicField(this, "funcList", []);
    __publicField(this, "portConfig", /* @__PURE__ */ Object.create(null));
    __publicField(this, "proxyRegistry", /* @__PURE__ */ Object.create(null));
    __publicField(this, "proxyHandleTemplate", {
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
    });
    __publicField(this, "elementProperty", {
      globalVariable: /* @__PURE__ */ Object.create(null),
      propReference: null
    });
    this.RENDER_TARGET_NONCE = RENDER_TARGET_NONCE;
  }
};
var _BUFFER, _RENDER_TARGET_NONCE;
var LibhNode = class extends String {
  constructor({ RENDER_TARGET_NONCE, STRINGS, KEYS }) {
    super(`<span id=${RENDER_TARGET_NONCE} hidden></span>`);
    __privateAdd(this, _BUFFER, void 0);
    __privateAdd(this, _RENDER_TARGET_NONCE, void 0);
    __privateSet(this, _BUFFER, new LibhBuffer({ RENDER_TARGET_NONCE }));
    for (let keyIndex = 0; keyIndex < STRINGS.length; keyIndex++) {
      __privateGet(this, _BUFFER).keyMap += STRINGS[keyIndex];
      if (keyIndex + 1 !== STRINGS.length) {
        switch (typeof KEYS[keyIndex]) {
          case "function":
            __privateGet(this, _BUFFER).keyMap += ` \${${__privateGet(this, _BUFFER).INSTANCE_UUID}:${keyIndex}} `;
            if (KEYS[keyIndex].constructor.name !== "Function") {
              throw new Error("Can not use async function");
            } else {
              const typeMap = getDeepCopy(KEYS[keyIndex](new Proxy({}, __privateGet(this, _BUFFER).proxyHandleTemplate)));
              const resultBuffer = KEYS[keyIndex](typeMap);
              resultBuffer.onclick();
              console.log(typeMap);
            }
            ;
            break;
          case "object":
            __privateGet(this, _BUFFER).keyMap += ` \${${__privateGet(this, _BUFFER).INSTANCE_UUID}:${keyIndex}} `;
            __privateGet(this, _BUFFER).portConfig = KEYS[keyIndex];
            if ("prop" in __privateGet(this, _BUFFER).portConfig) {
              throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved");
            }
            ;
            if ("global" in __privateGet(this, _BUFFER).portConfig) {
              __privateGet(this, _BUFFER).portConfig.global = getDeepCopy(__privateGet(this, _BUFFER).portConfig.global);
            }
            ;
            __privateGet(this, _BUFFER).portConfig.onclick(__privateGet(this, _BUFFER).portConfig);
            console.log(__privateGet(this, _BUFFER).portConfig);
            break;
          default:
            __privateGet(this, _BUFFER).keyMap += KEYS[keyIndex];
        }
        ;
      }
      ;
    }
    ;
    console.log(__privateGet(this, _BUFFER).keyMap);
    setTimeout(function() {
      const TARGET = document.getElementById(RENDER_TARGET_NONCE);
      if (!TARGET) {
        console.log(`instance created: ${__privateGet(this, _BUFFER).INSTANCE_UUID}`);
        __privateGet(this, _BUFFER).returnObject.flag = void 0;
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
    RETURN_NODE.id = __privateGet(this, _BUFFER).RENDER_TARGET_NONCE;
    return RETURN_NODE;
  }
};
_BUFFER = new WeakMap();
_RENDER_TARGET_NONCE = new WeakMap();
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
html.flag = function() {
  for (const FLAG_INDEX of arguments) {
    if (FLAG_INDEX in HTML_FLAG && !HTML_FLAG[FLAG_INDEX]) {
      HTML_FLAG[FLAG_INDEX] = true;
    }
    ;
  }
  ;
};
Object.assign(html.flag, {
  get state() {
    return JSON.parse(JSON.stringify(HTML_FLAG));
  }
});

// src/css.js
function css(strings, ...keys) {
}
export {
  css,
  html
};
