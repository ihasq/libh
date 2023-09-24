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
      createHTMLInstance((void 0)(), STRINGS, KEYS);
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
export {
  css,
  html,
  sass,
  scss
};
