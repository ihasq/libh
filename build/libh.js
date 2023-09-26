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
if (!window.libh) {
  window.libh = {};
}

// src/html.js
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function functionParser(fnBody) {
  const TEMPLATE_STRING = "" + fnBody;
  const LINE_START = TEMPLATE_STRING.lastIndexOf("\n");
  const FUNC_TYPE = !fnBody.hasOwnProperty("prototype") && !fnBody.name ? "arrow" : "normal";
  let FUNC_ARG = "";
  let FUNC_NAME;
  switch (FUNC_TYPE) {
    case "arrow":
      FUNC_ARG = TEMPLATE_STRING.slice(0, TEMPLATE_STRING.indexOf("=>")).replace(/ |\(|\)/g, "").split(",");
      break;
    default:
      if (fnBody.name) {
        FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf(`function ${fnBody.name ? fnBody.name : ""}(`, TEMPLATE_STRING.indexOf(`)`)));
      } else {
      }
      FUNC_ARG = TEMPLATE_STRING.slice(TEMPLATE_STRING.indexOf("function"));
      FUNC_NAME = fnBody.name;
  }
  ;
  const REF_COLLECTION = TEMPLATE_STRING.match(new RegExp(FUNC_ARG[0].replace(/\$/g, "\\$") + `(\\.[a-zA-Z0-9_$].*|\\[("(.*)"|'(.*)')\\])+`, "g"));
  console.log(REF_COLLECTION);
  console.log(FUNC_ARG);
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
    BUFFER.keyMap += encodeURI(STRINGS[index]);
    if (index + 1 !== STRINGS.length) {
      switch (typeof KEYS[index]) {
        case "function":
          BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
          if (KEYS[index].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            BUFFER.funcList.push(functionParser(KEYS[index]));
            console.log(BUFFER.funcList[index].TEMPLATE_STRING);
          }
          break;
        case "object":
          BUFFER.keyMap += ` \${${INSTANCE_ID}:${index}} `;
          break;
        default:
          BUFFER.keyMap += KEYS[index];
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
  const IDENTIFIER_UUID = window.crypto.randomUUID();
  const HTML_INSTANCE = Object.assign(new String("<span id=" + IDENTIFIER_UUID + " hidden></span>"), {
    LIBH_UUID: IDENTIFIER_UUID
  });
  setTimeout(() => {
    const TARGET = document.getElementById(IDENTIFIER_UUID);
    if (!TARGET) {
      console.log(`instance created: ${IDENTIFIER_UUID}`);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  css,
  html,
  sass,
  scss
});
