// src/html.js
var PARSE_BUFFER = {
  registry: /* @__PURE__ */ Object.create(null),
  HTMLParser: new DOMParser()
};
function createHTMLInstance(INSTANCE_ID, STRINGS, KEYS) {
  const BUFFER = {
    keyMap: "",
    funcList: [],
    portConfig: /* @__PURE__ */ Object.create(null),
    proxyRegistry: /* @__PURE__ */ Object.create(null),
    proxyHandleTemplate: {
      get(target, prop) {
        if (prop in target) {
          console.log("already has");
          return target[prop];
        } else {
          console.log("created");
          console.dir(target);
          BUFFER.proxyRegistry[prop] = {
            child: /* @__PURE__ */ Object.create(null),
            from: target.name
          };
          target[prop] = /* @__PURE__ */ Object.create(null);
          return new Proxy(BUFFER.proxyRegistry[prop].child, this);
        }
      },
      set(target, prop, value) {
        target[prop] = value;
      }
    }
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
            KEYS[keyIndex](new Proxy({}, BUFFER.proxyHandleTemplate));
            console.log(BUFFER.proxyRegistry);
          }
          break;
        case "object":
          BUFFER.keyMap += ` \${${INSTANCE_ID}:${keyIndex}} `;
          BUFFER.portConfig = KEYS[keyIndex];
          break;
        default:
          BUFFER.keyMap += KEYS[keyIndex];
      }
      ;
    }
  }
  ;
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
export {
  css,
  html,
  sass,
  scss
};
