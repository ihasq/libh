var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
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
  arguments[arguments.length - 1].apply(
    this,
    arguments[0].LIBH_STATIC.FLAG ? [arguments[0].LIBH_STATIC.getAsNode()] : arguments
  );
});
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
var LibhIdentifier = class extends String {
  constructor({ uuid }) {
    super(`<span id=${uuid} hidden></span>`);
    __publicField(this, "LIBH_STATIC", {
      FLAG: true,
      getAsNode() {
        const RETURN_NODE = document.createElement("span");
        RETURN_NODE.innerText = Date.now();
        RETURN_NODE.id = BUFFER.RENDER_TARGET_UUID;
        return RETURN_NODE;
      }
    });
  }
};
function createHTMLInstance({ STRINGS, KEYS }) {
  const BUFFER2 = {
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
    BUFFER2.keyMap += encodeURI(STRINGS[keyIndex]);
    if (keyIndex + 1 !== STRINGS.length) {
      switch (typeof KEYS[keyIndex]) {
        case "function":
          BUFFER2.keyMap += ` \${${BUFFER2.INSTANCE_UUID}:${keyIndex}} `;
          if (KEYS[keyIndex].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            const typeMap = getDeepCopy(KEYS[keyIndex](new Proxy({}, BUFFER2.proxyHandleTemplate)));
            const resultBuffer = KEYS[keyIndex](typeMap);
            resultBuffer.onclick();
            console.log(typeMap);
          }
          ;
          break;
        case "object":
          BUFFER2.keyMap += ` \${${BUFFER2.INSTANCE_UUID}:${keyIndex}} `;
          BUFFER2.portConfig = KEYS[keyIndex];
          if ("global" in BUFFER2.portConfig) {
            BUFFER2.portConfig.global = getDeepCopy(BUFFER2.portConfig.global);
          }
          ;
          if ("prop" in BUFFER2.portConfig) {
            throw new Error("Element initialization error: Cannot add 'prop' properties into initializer, token is reserved");
          }
          ;
          BUFFER2.portConfig.onclick(BUFFER2.portConfig);
          console.log(BUFFER2.portConfig);
          break;
        default:
          BUFFER2.keyMap += KEYS[keyIndex];
      }
      ;
    }
    ;
  }
  ;
  console.log(decodeURI(BUFFER2.keyMap));
  BUFFER2.returnObject = new LibhIdentifier({ uuid: BUFFER2.RENDER_TARGET_UUID });
  setTimeout(function() {
    const TARGET = document.getElementById(BUFFER2.RENDER_TARGET_UUID);
    if (!TARGET) {
      console.log(`instance created: ${BUFFER2.INSTANCE_UUID}`);
      BUFFER2.returnObject.LIBH_STATIC.flag = void 0;
    } else {
      console.log("html appended");
      TARGET.removeAttribute("id");
      TARGET.removeAttribute("hidden");
    }
    ;
  }, 0);
  return BUFFER2.returnObject;
}
function html(STRINGS, ...KEYS) {
  return createHTMLInstance({ STRINGS, KEYS });
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
export {
  css,
  html
};
