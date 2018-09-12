/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sketch-module-web-view/client.js":
/*!*******************************************************!*\
  !*** ./node_modules/sketch-module-web-view/client.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./lib/constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(actionName) {
  if (!actionName) {
    throw new Error('missing action name')
  }
  window[CONSTANTS.JS_BRIDGE].callNative(
    JSON.stringify([].slice.call(arguments))
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),

/***/ "./resources/app.js":
/*!**************************!*\
  !*** ./resources/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_module_web_view_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view/client */ "./node_modules/sketch-module-web-view/client.js");
/* harmony import */ var sketch_module_web_view_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_client__WEBPACK_IMPORTED_MODULE_0__);
 // Disable the context menu to have a more native feel

if (false) {} // All inputs


var allInputs = [];
["gridHorizontalSpace", "gridVerticalSpace", "snapDistance", "renameArtboards", "arrangeOnAdd"].forEach(function (id) {
  allInputs.push(document.getElementById(id));
});

var populateSettings = function populateSettings() {
  if (window.settings === undefined) populateSettings();
  allInputs.forEach(function (input) {
    if (input.type === "checkbox") {
      input.checked = window.settings[input.id];
    } else {
      input.value = window.settings[input.id];
    }
  });
};

var generateSettings = function generateSettings() {
  var obj = {};
  allInputs.forEach(function (input) {
    var val = Number(input.value);

    if (input.type === "checkbox") {
      val = Boolean(input.checked);
    } else if (input.type === "text") {
      val = input.value;
    }

    obj[input.id] = val;
  });
  return obj;
};

populateSettings();
document.getElementById("submit").addEventListener("click", function () {
  sketch_module_web_view_client__WEBPACK_IMPORTED_MODULE_0___default()("updateSettings", generateSettings());
});

/***/ })

/******/ });
//# sourceMappingURL=app.js.map