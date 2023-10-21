const UTIL = {
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
      case "function":
        break;
      case "object":
        for (const symbol in key) {
          KEY_BUFFER[symbol] = symbol in propertyPreset ? propertyPreset[symbol](key) : key[symbol];
        }
        ;
        break;
    }
  });
  staticBuffer = staticBuffer.slice(staticBuffer.indexOf("{") + 1, staticBuffer.lastIndexOf("}"));
  setTimeout(function() {
  }, 0);
  return Object.assign(staticBuffer, {
    LIBH_VERIFIER: ""
  });
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
