// src/core/getKeyIdentifier.js
var generateInstanceId = function() {
  return (Math.floor(Math.random() * (32 ** 6 - 32 ** 5 - 1)) + 32 ** 5).toString(32);
};

// src/html/html.js
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

// src/scss/scss.js
function scss(strings, ...keys) {
}

// src/sass.js
function sass(strings, ...keys) {
}

// src/document.js
var document = {};
export {
  css,
  document,
  html,
  sass,
  scss
};
