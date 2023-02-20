"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/webhooks";
exports.ids = ["pages/api/webhooks"];
exports.modules = {

/***/ "probot":
/*!*************************!*\
  !*** external "probot" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("probot");

/***/ }),

/***/ "(api)/./src/bot/index.ts":
/*!**************************!*\
  !*** ./src/bot/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction bot(app) {\n    app.on(\"issues.opened\", async (context)=>{\n        const issueComment = context.issue({\n            body: \"Thanks for opening this issue!\"\n        });\n        await context.octokit.issues.createComment(issueComment);\n    });\n// For more information on building apps:\n// https://probot.github.io/docs/\n// To get your app running against GitHub, see:\n// https://probot.github.io/docs/development/\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bot);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvYm90L2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFJQSxTQUFTQSxJQUFJQyxHQUFXLEVBQUU7SUFDeEJBLElBQUlDLEVBQUUsQ0FBQyxpQkFBaUIsT0FBT0MsVUFBaUI7UUFDOUMsTUFBTUMsZUFBZUQsUUFBUUUsS0FBSyxDQUFDO1lBQ2pDQyxNQUFNO1FBQ1I7UUFDQSxNQUFNSCxRQUFRSSxPQUFPLENBQUNDLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDTDtJQUM3QztBQUNBLHlDQUF5QztBQUN6QyxpQ0FBaUM7QUFFakMsK0NBQStDO0FBQy9DLDZDQUE2QztBQUMvQztBQUVBLGlFQUFlSixHQUFHQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHViLWxpbnRlci1ib3QvLi9zcmMvYm90L2luZGV4LnRzPzE5OWUiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7IFByb2JvdCB9IGZyb20gJ3Byb2JvdCc7XG5cbmZ1bmN0aW9uIGJvdChhcHA6IFByb2JvdCkge1xuICBhcHAub24oJ2lzc3Vlcy5vcGVuZWQnLCBhc3luYyAoY29udGV4dDogYW55KSA9PiB7XG4gICAgY29uc3QgaXNzdWVDb21tZW50ID0gY29udGV4dC5pc3N1ZSh7XG4gICAgICBib2R5OiAnVGhhbmtzIGZvciBvcGVuaW5nIHRoaXMgaXNzdWUhJyxcbiAgICB9KTtcbiAgICBhd2FpdCBjb250ZXh0Lm9jdG9raXQuaXNzdWVzLmNyZWF0ZUNvbW1lbnQoaXNzdWVDb21tZW50KTtcbiAgfSk7XG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGJ1aWxkaW5nIGFwcHM6XG4gIC8vIGh0dHBzOi8vcHJvYm90LmdpdGh1Yi5pby9kb2NzL1xuXG4gIC8vIFRvIGdldCB5b3VyIGFwcCBydW5uaW5nIGFnYWluc3QgR2l0SHViLCBzZWU6XG4gIC8vIGh0dHBzOi8vcHJvYm90LmdpdGh1Yi5pby9kb2NzL2RldmVsb3BtZW50L1xufVxuXG5leHBvcnQgZGVmYXVsdCBib3Q7XG4iXSwibmFtZXMiOlsiYm90IiwiYXBwIiwib24iLCJjb250ZXh0IiwiaXNzdWVDb21tZW50IiwiaXNzdWUiLCJib2R5Iiwib2N0b2tpdCIsImlzc3VlcyIsImNyZWF0ZUNvbW1lbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/bot/index.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/webhooks.ts":
/*!***********************************!*\
  !*** ./src/pages/api/webhooks.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var probot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! probot */ \"probot\");\n/* harmony import */ var probot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(probot__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/bot */ \"(api)/./src/bot/index.ts\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,probot__WEBPACK_IMPORTED_MODULE_0__.createNodeMiddleware)(_bot__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    probot: (0,probot__WEBPACK_IMPORTED_MODULE_0__.createProbot)(),\n    webhooksPath: \"/api/webhooks\"\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3dlYmhvb2tzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBNEQ7QUFDcEM7QUFFeEIsaUVBQWVBLDREQUFvQkEsQ0FBQ0UsNENBQUdBLEVBQUU7SUFBRUMsUUFBUUYsb0RBQVlBO0lBQUlHLGNBQWM7QUFBZ0IsRUFBRSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHViLWxpbnRlci1ib3QvLi9zcmMvcGFnZXMvYXBpL3dlYmhvb2tzLnRzP2QzYTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlTm9kZU1pZGRsZXdhcmUsIGNyZWF0ZVByb2JvdCB9IGZyb20gJ3Byb2JvdCc7XG5pbXBvcnQgYXBwIGZyb20gJ0AvYm90JztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTm9kZU1pZGRsZXdhcmUoYXBwLCB7IHByb2JvdDogY3JlYXRlUHJvYm90KCksIHdlYmhvb2tzUGF0aDogJy9hcGkvd2ViaG9va3MnIH0pO1xuIl0sIm5hbWVzIjpbImNyZWF0ZU5vZGVNaWRkbGV3YXJlIiwiY3JlYXRlUHJvYm90IiwiYXBwIiwicHJvYm90Iiwid2ViaG9va3NQYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/webhooks.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/webhooks.ts"));
module.exports = __webpack_exports__;

})();