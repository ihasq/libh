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
var libh_exports = {};
__export(libh_exports, {
  html: () => html
});
module.exports = __toCommonJS(libh_exports);
Object.defineProperty(Element.prototype, "innerHTML", {
  set: function() {
    if (!BUFFER.flags["disable-element-extension"] && arguments[0] instanceof Node) {
      this.replaceChildren(arguments[0]);
      if (arguments[0].FLAG === "LIBH_INSTANCE") {
        BUFFER.igniteElement(arguments[0]);
      }
      ;
    } else {
      DESC["innerHTML"].set.call(this, arguments);
    }
    ;
  }
});
Object.defineProperty(Element.prototype, "insertAdjacentHTML", {
  set: function() {
    if (!BUFFER.flags["disable-element-extension"] && arguments[1] instanceof Node) {
      this.replaceChildren(arguments[1]);
      if (arguments[0].FLAG === "LIBH_INSTANCE") {
        BUFFER.igniteElement(arguments[1]);
      }
      ;
    } else {
      DESC["innerHTML"].set.call(this, arguments);
    }
    ;
  }
});
Object.defineProperty(Document.prototype, "body", {
  set: function() {
    if (!BUFFER.flags["disable-element-extension"] && arguments[0] instanceof Node) {
      this.body.replaceChildren(arguments[0]);
      if (arguments[0].FLAG === "LIBH_INSTANCE") {
        BUFFER.igniteElement(arguments[0]);
      }
      ;
    } else {
      DESC["body"].set.call(this, arguments);
    }
    ;
  }
});
const DESC = {
  innerHTML: Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"),
  insertAdjacentHTML: Object.getOwnPropertyDescriptor(Element.prototype, "insertAdjacentHTML"),
  body: Object.getOwnPropertyDescriptor(Document.prototype, "body")
};
const UTIL = {
  getDeepCopy(OBJECT_DATA) {
    const KEY_DATA = Object.keys(OBJECT_DATA);
    const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
    for (let objectKeyIndex = 0; objectKeyIndex < Object.keys(OBJECT_DATA).length; objectKeyIndex++) {
      RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = typeof OBJECT_DATA[KEY_DATA[objectKeyIndex]] === "object" ? this.getDeepCopy(OBJECT_DATA[KEY_DATA[objectKeyIndex]]) : OBJECT_DATA[KEY_DATA[objectKeyIndex]];
    }
    ;
    return RETURN_BUFFER;
  },
  HTMLParser: new DOMParser()
};
const QUERY = {
  BANNED_PROPERTY: [
    "prop",
    "super",
    "__proto__",
    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__"
  ],
  RESERVED_KEY: [
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
  ]
};
const BUFFER = {
  flags: {
    "enable-node-return": false,
    "disable-element-extension": false
  },
  elementRegistry: /* @__PURE__ */ Object.create(null),
  sortTemplateMap({ STRINGS, KEYS }) {
    const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
    let index = 0;
    for (index; index < STRINGS.length; index++) {
      RETURN_BUFFER[index * 2] = STRINGS[index];
      RETURN_BUFFER[index * 2 + 1] = KEYS[index];
    }
    ;
    delete RETURN_BUFFER[index * 2 - 1];
    return RETURN_BUFFER;
  },
  createElement({ STRINGS, KEYS }) {
    const INSTANCE_UUID = crypto.randomUUID();
    let staticBuffer = "";
    STRINGS.forEach(function(string, index) {
      staticBuffer += string + (index + 1 === STRINGS.length ? "" : " libh-tag=instance-" + INSTANCE_UUID + "-" + index + " ");
    });
    KEYS.forEach(function(key, index) {
      switch (typeof key) {
        case "object":
          if (key instanceof Node) {
          }
      }
    });
    staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));
    const RETURN_BUFFER = document.createDocumentFragment();
    const TEMPLATE_BODY = UTIL.HTMLParser.parseFromString(staticBuffer, "text/html").body.children;
    for (let index = 0; index < 2; index++) {
      RETURN_BUFFER.appendChild(TEMPLATE_BODY[0]);
    }
    ;
    RETURN_BUFFER.querySelector("button").addEventListener("click", (event) => {
      console.log("wee");
    });
    RETURN_BUFFER.FLAG = "LIBH_INSTANCE";
    const EVENT_QUERY = {};
    return RETURN_BUFFER;
  },
  igniteElement(ELEMENT) {
  }
};
const INFO = {
  "package": "libh",
  "cdn": "npm",
  "module": "html",
  "version": "0.0.16",
  "available-flags": Object.keys(BUFFER.flags)
};
const html = (STRINGS, ...KEYS) => BUFFER.createElement({ STRINGS, KEYS });
Object.defineProperties(html, {
  reservedKey: {
    get: function() {
      return QUERY.RESERVED_KEY;
    },
    configurable: false
  },
  info: {
    get: function() {
      return JSON.parse(JSON.stringify(INFO));
    },
    configurable: false
  }
});
html.flag = function(...flag) {
  flag.forEach(function(FLAG_INDEX) {
    if (FLAG_INDEX in BUFFER.flags) {
      if (!BUFFER.flags[FLAG_INDEX]) {
        BUFFER.flags[FLAG_INDEX] = true;
      } else {
        console.info(`Flag "${FLAG_INDEX}" is already enabled`);
      }
    } else {
      console.warn(`Flag "${FLAG_INDEX}" is not available in version ${INFO.version}`);
    }
    ;
  });
};
Object.defineProperties(html.flag, {
  list: {
    get: function() {
      return Object.keys(BUFFER.flags);
    },
    configurable: false
  },
  state: {
    get: function() {
      return JSON.parse(JSON.stringify(BUFFER.flags));
    },
    configurable: false
  }
});
html.getTemplate = function() {
  return {
    router: {}
  };
};
Object.freeze(html);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  html
});
