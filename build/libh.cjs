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
  html: () => html,
  sass: () => sass,
  scss: () => scss
});
module.exports = __toCommonJS(libh_exports);

// src/html.js
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
var MY_HANDLE = {
  get(target, prop) {
    if (!(prop in target)) {
      console.log("created");
      return new Proxy({}, this);
    } else {
      console.log("already has");
      return target[prop];
    }
  },
  handlerRegistry: []
};
function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {
  const BUFFER = {
    keyMap: "",
    funcList: []
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
            const buffer = KEYS[keyIndex](new Proxy({}, MY_HANDLE));
            console.dir(buffer.hook);
            console.dir(buffer.hook.avatarURL);
          }
          break;
        case "object":
          BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
          break;
        default:
          BUFFER.keyMap += KEYS[keyIndex];
      }
      ;
    }
  }
  ;
  BUFFER.keyMap = decodeURI(BUFFER.keyMap);
  console.log(BUFFER.keyMap);
  const SELECTOR = new RegExp(` \\$\\{${INSTANCE_ID}:[0-9]\\} `, "g");
  const TEMPLATE = PARSE_BUFFER.HTMLParser.parseFromString(
    BUFFER.keyMap.slice(BUFFER.keyMap.indexOf("{") + 1, BUFFER.keyMap.lastIndexOf("}")),
    "text/html"
  ).body;
  console.dir(TEMPLATE.children);
  PARSE_BUFFER.registry[INSTANCE_ID] = Object.assign(BUFFER, {
    instanceId: INSTANCE_ID,
    keys: {}
  });
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

// src/scss.js
function scss(strings, ...keys) {
}

// src/sass.js
function sass(strings, ...keys) {
}
