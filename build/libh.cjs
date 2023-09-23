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
function createHTMLInstance(instanceId, strings, keys) {
  const BUFFER = {
    keyMap: "",
    funcList: []
  };
  for (let index = 0; index < strings.length; index++) {
    BUFFER.keyMap += strings[index];
    if (index + 1 !== strings.length) {
      BUFFER.keyMap += ` \${${instanceId}:${index}} `;
      switch (typeof keys[index]) {
        case "function":
          if (keys[index].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            BUFFER.funcList.push(functionParser(keys[index]));
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
  const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]\\} `, "g");
  const TEMPLATE = PARSE_BUFFER.HTMLParser.parseFromString(
    BUFFER.keyMap.slice(BUFFER.keyMap.indexOf("{") + 1, BUFFER.keyMap.lastIndexOf("}")),
    "text/html"
  ).body;
  console.dir(TEMPLATE.children);
  PARSE_BUFFER.registry[instanceId] = Object.assign(BUFFER, {
    instanceId,
    keys: {}
  });
}
function html(strings, ...keys) {
  createHTMLInstance(crypto.randomUUID(), strings, keys);
  return;
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
  "oneffect"
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
