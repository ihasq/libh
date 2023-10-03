const { INFO, DESC, UTIL, QUERY, BUFFER } = {
  INFO: {
    "package": "libh",
    "cdn": "npm",
    "module": "html",
    "version": "0.0.16",
    "available-flags": Object.keys(BUFFER.flags)
  },
  DESC: {
    innerHTML: Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"),
    insertAdjacentHTML: Object.getOwnPropertyDescriptor(Element.prototype, "insertAdjacentHTML")
  },
  UTIL: {
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
  },
  QUERY: {
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
  },
  BUFFER: {
    flags: {
      "enable-node-return": false,
      "disable-innerhtml-node": false
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
      staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));
      const RETURN_BUFFER = document.createDocumentFragment();
      const TEMPLATE_BODY = UTIL.HTMLParser.parseFromString(staticBuffer, "text/html").body;
      const TEMPLATE_ELEMENT = TEMPLATE_BODY.children;
      for (let index = 0; index < TEMPLATE_ELEMENT.length; index++) {
        RETURN_BUFFER.appendChild(TEMPLATE_ELEMENT[index]);
      }
      ;
      const EVENT_QUERY = {};
      return RETURN_BUFFER;
    },
    igniteElement(ELEMENT) {
    }
  }
};
Object.defineProperty(Element.prototype, "innerHTML", {
  set: function(STRING) {
    if (!BUFFER.flags["disable-innerhtml-node"] && STRING instanceof Node) {
      if (STRING.FLAG === "LIBH_INSTANCE") {
        BUFFER.igniteElement(STRING);
      }
      ;
      this.replaceChildren();
      this.appendChild(STRING);
    } else {
      DESC["innerHTML"].set.call(this, STRING);
    }
    ;
  }
});
function html(STRINGS, ...KEYS) {
  return BUFFER.createElement({ STRINGS, KEYS });
}
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
