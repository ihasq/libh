const DESC = {
  innerHTML: Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"),
  insertAdjacentHTML: Object.getOwnPropertyDescriptor(Element.prototype, "insertAdjacentHTML")
};
Object.defineProperty(Element.prototype, "innerHTML", {
  set: function(STRING) {
    if (STRING instanceof Node && BUFFER.flags["disable-innerhtml-node"]) {
      this.replaceChildren();
      this.appendChild(STRING);
    } else {
      DESC["innerHTML"].set.call(this, STRING);
    }
    ;
  }
});
const UTIL = {
  getDeepCopy(objectData) {
    const KEY_DATA = Object.keys(objectData);
    const RETURN_BUFFER = /* @__PURE__ */ Object.create(null);
    for (let objectKeyIndex = 0; objectKeyIndex < Object.keys(objectData).length; objectKeyIndex++) {
      RETURN_BUFFER[KEY_DATA[objectKeyIndex]] = typeof objectData[KEY_DATA[objectKeyIndex]] === "object" ? this.getDeepCopy(objectData[KEY_DATA[objectKeyIndex]]) : objectData[KEY_DATA[objectKeyIndex]];
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
    "disable-innerhtml-node": false
  },
  elementRegistry: /* @__PURE__ */ Object.create(null),
  createElement({ STRINGS, KEYS }) {
    const INSTANCE_UUID = crypto.randomUUID();
    this.elementRegistry[INSTANCE_UUID] = {
      INSTANCE_UUID,
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
            const proxyRef = crypto.randomUUID();
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
      createRenderPath() {
        const PROXIED_RENDER_PATH = /* @__PURE__ */ Object.create(null);
        const ELEMENT = document.createDocumentFragment();
        ELEMENT.appendChild(document.createElement("span"));
        return ELEMENT;
      }
    };
    const REGISTRY = this.elementRegistry[INSTANCE_UUID];
    return REGISTRY;
  }
};
function html(STRINGS, ...KEYS) {
  const BUFFER_PATH = BUFFER.createElement({ STRINGS, KEYS });
  return BUFFER_PATH.createRenderPath();
}
const INFO = {
  "package": "libh",
  "cdn": "npm",
  "module": "html",
  "version": "0.0.16",
  "available-flags": Object.keys(BUFFER.flags)
};
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
  for (const FLAG_INDEX of flag) {
    if (FLAG_INDEX in BUFFER.flags) {
      if (!BUFFER.flags[FLAG_INDEX]) {
        BUFFER.flags[FLAG_INDEX] = true;
      }
      ;
    } else {
      console.warn(`Flag "${FLAG_INDEX}" is not available in version ${INFO.version}`);
    }
  }
  ;
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
Object.freeze(html);
export {
  html
};
