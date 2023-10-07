Object.defineProperty(Document.prototype, "body", {
  set: function() {
    if (!FLAGS["disable-element-extension"] && arguments[0] instanceof Node) {
      this.body.parentNode.replaceChild(arguments[0], this.body);
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
const propertyPreset = {
  global: () => "",
  class: (key) => key.class.split(" ")
};
function createElement({ STRINGS, KEYS }) {
  const INSTANCE_UUID = crypto.randomUUID();
  let staticBuffer = "";
  STRINGS.forEach(function(string, index) {
    staticBuffer += string + (index + 1 === STRINGS.length ? "" : " libh-tag=instance-" + INSTANCE_UUID + "-" + index + " ");
  });
  const KEY_BUFFER = /* @__PURE__ */ Object.create(null);
  KEYS.forEach((key, index) => {
    switch (typeof key) {
      case "object":
        for (const symbol in key) {
          KEY_BUFFER[symbol] = symbol in propertyPreset ? propertyPreset[symbol](key) : key[symbol];
        }
        ;
        break;
    }
  });
  staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));
  const RETURN_BUFFER = document.createDocumentFragment();
  const TEMPLATE_BODY = UTIL.HTMLParser.parseFromString(staticBuffer, "text/html").body.children;
  for (let index = 0; index < TEMPLATE_BODY.length; index++) {
    RETURN_BUFFER.appendChild(TEMPLATE_BODY[0]);
  }
  ;
  RETURN_BUFFER.querySelector("button").addEventListener("click", (event) => {
    console.log("wee");
  });
  const EVENT_QUERY = {};
  return RETURN_BUFFER;
}
const FLAGS = {
  "enable-node-return": false,
  "disable-element-extension": false
};
const INFO = {
  "package": "libh",
  "cdn": "npm",
  "module": "html",
  "version": "0.0.16",
  "available-flags": Object.keys(FLAGS)
};
const html = (STRINGS, ...KEYS) => createElement({ STRINGS, KEYS });
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
    if (FLAG_INDEX in FLAGS) {
      if (!FLAGS[FLAG_INDEX]) {
        FLAGS[FLAG_INDEX] = true;
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
      return Object.keys(FLAGS);
    },
    configurable: false
  },
  state: {
    get: function() {
      return JSON.parse(JSON.stringify(FLAGS));
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
export {
  html
};
