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
  css: () => import_css.css,
  html: () => import_html.html,
  sass: () => import_sass.sass,
  scss: () => import_scss.scss
});
module.exports = __toCommonJS(libh_exports);
var import_html = require("./html.js");
var import_css = require("./css.js");
var import_scss = require("./scss.js");
var import_sass = require("./sass.js");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  css,
  html,
  sass,
  scss
});
