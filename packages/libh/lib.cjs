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

// src/core.js
var STATIC_UUID = {
  registry: /* @__PURE__ */ Object.create(null),
  index: 0,
  reset() {
    for (let i = 0; i < 256; i++) {
      this.registry[i] = crypto.randomUUID();
    }
    ;
    this.index = 0;
  }
};
function getStaticUUID() {
  if (STATIC_UUID.index === 255) {
    setTimeout(STATIC_UUID.reset, 0);
  }
  ;
  STATIC_UUID.index++;
  return STATIC_UUID.registry[STATIC_UUID.index];
}
STATIC_UUID.reset();

// src/html.js
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function functionParser(fnBody) {
  const TEMPLATE_STRING = "" + fnBody;
  const FUNC_TYPE = fnBody.hasOwnProperty("prototype") ? "normal" : fnBody.name ? "normal" : "arrow";
  let FUNC_ARG = "";
  let FUNC_NAME;
  if (FUNC_TYPE === "normal") {
    if (fnBody.name) {
      FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf(`function ${fnBody.name}`));
    } else {
    }
    FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf("function"));
    FUNC_NAME = fnBody.name;
  } else {
  }
  console.log(FUNC_NAME);
  return {
    TEMPLATE_STRING,
    FUNC_TYPE
  };
}
function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {
  const BUFFER = {
    keyMap: "",
    funcList: []
  };
  for (let index = 0; index < STRINGS.length; index++) {
    BUFFER.keyMap += STRINGS[index];
    if (index + 1 !== STRINGS.length) {
      BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
      switch (typeof KEYS[index]) {
        case "function":
          if (KEYS[index].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            BUFFER.funcList.push(functionParser(KEYS[index]));
            console.log(BUFFER.funcList[index].TEMPLATE_STRING);
          }
          break;
        case "object":
          throw new Error("not yet");
        default:
      }
      ;
    }
  }
  ;
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
function html(strings, ...keys) {
  const IDENTIFIER_UUID = getStaticUUID();
  const HTML_INSTANCE = new String("<span id=" + IDENTIFIER_UUID + " hidden></span>");
  HTML_INSTANCE.libh = {};
  setTimeout(() => {
    const TARGET = document.getElementById(IDENTIFIER_UUID);
    if (!TARGET) {
      console.log("instance created");
    } else {
      console.log("html appended");
      const APPEND_TARGET = TARGET.parentElement;
      TARGET.remove();
      createHTMLInstance(getStaticUUID(), strings, keys);
    }
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
