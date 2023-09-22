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

// src/core/getKeyIdentifier.js
var generateInstanceId = function() {
  return (Math.floor(Math.random() * (32 ** 6 - 32 ** 5 - 1)) + 32 ** 5).toString(32);
};

// src/html.js
var parseBuffer = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function functionParser(fnBody) {
  const TEMPLATE_STRING = "" + fnBody;
  const FUNC_TYPE = fnBody.hasOwnProperty("prototype") ? "normal" : fnBody.name ? "normal" : "arrow";
  console.log(FUNC_TYPE);
  return {
    TEMPLATE_STRING,
    FUNC_TYPE
  };
}
function createHTMLInstance(instanceId, strings, keys) {
  const buffer = {
    keyMap: "",
    funcList: []
  };
  for (let index = 0; index < strings.length; index++) {
    buffer.keyMap += strings[index];
    if (index + 1 !== strings.length) {
      buffer.keyMap += ` \${${instanceId}:${index}} `;
      switch (typeof keys[index]) {
        case "function":
          if (keys[index].constructor.name !== "Function") {
            throw new Error("Can not use async function");
          } else {
            buffer.funcList.push(functionParser(keys[index]));
            console.log(buffer.funcList[index].TEMPLATE_STRING);
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
  console.log(buffer.keyMap);
  const SELECTOR = new RegExp(` \\$\\{${instanceId}:[0-9]\\} `, "g");
  const TEMPLATE = parseBuffer.HTMLParser.parseFromString(
    buffer.keyMap.slice(buffer.keyMap.indexOf("{") + 1, buffer.keyMap.lastIndexOf("}")),
    "text/html"
  ).body;
  console.dir(TEMPLATE.children);
  parseBuffer.registry[instanceId] = Object.assign(buffer, {
    instanceId,
    keys: {}
  });
}
function html(strings, ...keys) {
  createHTMLInstance(generateInstanceId(), strings, keys);
  return;
}
html.getReservedKey = [
  "shared",
  "prop",
  "this",
  "static",
  "method",
  "meta"
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
