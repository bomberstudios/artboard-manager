var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/artboard-manager.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/artboard-manager.js":
/*!*********************************!*\
  !*** ./src/artboard-manager.js ***!
  \*********************************/
/*! exports provided: ArtboardChanged, Duplicate, LayersMoved, ArrangeArtboards, Resize, ResizeArtboardToFit, InsertArtboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtboardChanged", function() { return ArtboardChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Duplicate", function() { return Duplicate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayersMoved", function() { return LayersMoved; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrangeArtboards", function() { return ArrangeArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resize", function() { return Resize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeArtboardToFit", function() { return ResizeArtboardToFit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertArtboard", function() { return InsertArtboard; });
// Config
var config = {
  renameArtboards: false,
  snapDistance: 400,
  gridHorizontalSpace: 50,
  gridVerticalSpace: 500,
  arrangeOnAdd: false,
  artboardBasenames: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
};

var sort_by_x_position = function sort_by_x_position(a, b) {
  return a.frame().left() - b.frame().left();
};

var sort_by_y_position = function sort_by_y_position(a, b) {
  return a.frame().top() - b.frame().top();
};

function ArtboardChanged(context) {
  console.log("ArtboardChanged"); // Called on
  // - Add
  // - Remove
  // - Duplicate
  // - Move
  // - Select
  // - Unselect
  // This function is called when an artboard is added, *and* when artboards are moved
  // so we need to somehow filter the event so that we don't end up arranging the artboards
  // twice after each move operation. By now, we'll just ignore the event…
  // console.log(context)
  // console.log(context.actionContext)
}

var anArtboardIsSelected = function anArtboardIsSelected(context) {
  console.log("anArtboardIsSelected"); // We need a document, let's try some options:

  var doc = context.document || context.actionContext.document || NSApp.orderedDocuments().firstObject();
  var selectedLayers = doc.selectedLayers().layers();
  console.log(selectedLayers);

  if (selectedLayers.count() > 0) {
    var _arr = Array.from(selectedLayers);

    for (var _i = 0; _i < _arr.length; _i++) {
      var layer = _arr[_i];

      if (layer.className() == "MSArtboardGroup") {
        return true;
      }
    }
  }

  return false;
};

function Duplicate(context) {
  console.log('Duplicate');

  if (anArtboardIsSelected(context)) {
    ArrangeArtboards(context);
  }
}
function LayersMoved(context) {
  console.log("LayersMoved");
  var movedLayers = Array.from(context.actionContext.layers);
  var needToArrange = false;

  for (var _i2 = 0; _i2 < movedLayers.length; _i2++) {
    var layer = movedLayers[_i2];

    if (layer.className() == "MSArtboardGroup") {
      needToArrange = true;
    }
  }

  if (needToArrange) {
    ArrangeArtboards(context);
  }
}
function ArrangeArtboards(context) {
  console.log("ArrangeArtboards");
  var doc = MSDocument.currentDocument();
  var originalSelection = doc.selectedLayers();
  var artboards = doc.currentPage().artboards();
  var layoutBounds = MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers(artboards));
  var layoutWidth = layoutBounds.size.width;
  var layoutHeight = layoutBounds.size.height;
  var layoutX = layoutBounds.origin.x;
  var layoutY = layoutBounds.origin.y;
  var numberOfRows = (layoutHeight / config.gridVerticalSpace).toFixed();
  var currentRow = 0;
  var currentRowPosition = layoutY;
  var rows = [];

  while (currentRow < numberOfRows) {
    // console.log("Processing row " + currentRow + ", which starts at position: " + (currentRowPosition - layoutY))
    var currentRowArtboards = [];

    var _arr2 = Array.from(artboards);

    for (var _i3 = 0; _i3 < _arr2.length; _i3++) {
      var artboard = _arr2[_i3];

      if (Math.abs(artboard.frame().y() - currentRowPosition) <= config.snapDistance) {
        artboard.frame().y = currentRowPosition;
        currentRowArtboards.push(artboard);
      }
    }

    if (currentRowArtboards.length > 0) {
      rows.push(currentRowArtboards);
    }

    currentRowPosition += config.gridVerticalSpace;
    currentRow++;
  } // Now, update positions for all artboards


  var verticalOffset = 0;
  var rowNumber = 0;

  for (var _i4 = 0; _i4 < rows.length; _i4++) {
    var row = rows[_i4];
    // Vertical positions
    var tallestArtboard = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _artboard = _step2.value;
        _artboard.frame().y = verticalOffset + layoutY;
        tallestArtboard = Math.max(tallestArtboard, _artboard.frame().height());
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    verticalOffset += tallestArtboard + config.gridVerticalSpace / 2; // Horizontal positions & name

    var offsetX = 0;
    var columnNumber = 1;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = row.sort(sort_by_x_position)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _artboard2 = _step3.value;
        _artboard2.frame().x = layoutX + offsetX;
        offsetX += _artboard2.frame().width() + config.gridHorizontalSpace;

        if (config.renameArtboards) {
          _artboard2.setName(config.artboardBasenames[rowNumber] + columnNumber);
        }

        columnNumber++;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    rowNumber++;
  } // Update stacking


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Array.from(artboards).sort(sort_by_x_position).sort(sort_by_y_position)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _artboard3 = _step.value;

      var parent = _artboard3.parentGroup();

      _artboard3.removeFromParent();

      parent.insertLayer_atIndex(_artboard3, 0);
    } // Restore original selection

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _arr3 = Array.from(originalSelection);

  for (var _i5 = 0; _i5 < _arr3.length; _i5++) {
    var layer = _arr3[_i5];
    layer.isSelected = true;
  }
}
function Resize(context) {
  console.log("Resize"); // console.log(context)

  console.log(context.actionContext); // "Normal" — User selected the Artboard tool to add an Artboard 🤔

  if (context.actionContext.name == "NormalResize" || context.actionContext.name == "NormalMultipleResize" || context.action == "ResizeArtboardToFit.finish") {
    if (anArtboardIsSelected(context)) {
      ArrangeArtboards(context);
    }
  }

  if (context.actionContext.name == "InsertArtboard" && config.arrangeOnAdd) {
    ArrangeArtboards(context);
  }
}
function ResizeArtboardToFit(context) {
  console.log("ResizeArtboardToFit");
  Resize(context);
}
function InsertArtboard(context) {
  console.log('InsertArtboard');
}

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['ArtboardChanged'] = __skpm_run.bind(this, 'ArtboardChanged');
that['LayersMoved'] = __skpm_run.bind(this, 'LayersMoved');
that['Duplicate'] = __skpm_run.bind(this, 'Duplicate');
that['Resize'] = __skpm_run.bind(this, 'Resize');
that['ResizeArtboardToFit'] = __skpm_run.bind(this, 'ResizeArtboardToFit');
that['InsertArtboard'] = __skpm_run.bind(this, 'InsertArtboard');
that['onRun'] = __skpm_run.bind(this, 'default');
that['ArrangeArtboards'] = __skpm_run.bind(this, 'ArrangeArtboards')

//# sourceMappingURL=artboard-manager.js.map