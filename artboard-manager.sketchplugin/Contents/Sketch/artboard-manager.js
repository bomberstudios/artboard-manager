var that = this;
function run (key, context) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtboardChanged = ArtboardChanged;
exports.Duplicate = Duplicate;
exports.LayersMoved = LayersMoved;
exports.ArrangeArtboards = ArrangeArtboards;
exports.Resize = Resize;
exports.ResizeArtboardToFit = ResizeArtboardToFit;
exports.InsertArtboard = InsertArtboard;
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
  console.log("ArtboardChanged");
  // Called on
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
  console.log("anArtboardIsSelected");
  // We need a document, let's try some options:
  var doc = context.document || context.actionContext.document || NSApp.orderedDocuments().firstObject();
  var selectedLayers = doc.selectedLayers().layers();
  console.log(selectedLayers);
  if (selectedLayers.count() > 0) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(selectedLayers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var layer = _step.value;

        if (layer.className() == "MSArtboardGroup") {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = movedLayers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var layer = _step2.value;

      if (layer.className() == "MSArtboardGroup") {
        needToArrange = true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
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
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Array.from(artboards)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var artboard = _step3.value;

        if (Math.abs(artboard.frame().y() - currentRowPosition) <= config.snapDistance) {
          artboard.frame().y = currentRowPosition;
          currentRowArtboards.push(artboard);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    if (currentRowArtboards.length > 0) {
      rows.push(currentRowArtboards);
    }
    currentRowPosition += config.gridVerticalSpace;
    currentRow++;
  }

  // Now, update positions for all artboards
  var verticalOffset = 0;
  var rowNumber = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = rows[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var row = _step4.value;


      // Vertical positions
      var tallestArtboard = 0;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = row[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _artboard2 = _step7.value;

          _artboard2.frame().y = verticalOffset + layoutY;
          tallestArtboard = Math.max(tallestArtboard, _artboard2.frame().height());
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      verticalOffset += tallestArtboard + config.gridVerticalSpace / 2;

      // Horizontal positions & name
      var offsetX = 0;
      var columnNumber = 1;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = row.sort(sort_by_x_position)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _artboard3 = _step8.value;

          _artboard3.frame().x = layoutX + offsetX;
          offsetX += _artboard3.frame().width() + config.gridHorizontalSpace;
          if (config.renameArtboards) {
            _artboard3.setName(config.artboardBasenames[rowNumber] + columnNumber);
          }
          columnNumber++;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      rowNumber++;
    }

    // Update stacking
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = Array.from(artboards).sort(sort_by_x_position).sort(sort_by_y_position)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _artboard = _step5.value;

      var parent = _artboard.parentGroup();
      _artboard.removeFromParent();
      parent.insertLayer_atIndex(_artboard, 0);
    }
    // Restore original selection
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = Array.from(originalSelection)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var layer = _step6.value;

      layer.isSelected = true;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
}

function Resize(context) {
  console.log("Resize");
  // console.log(context)
  console.log(context.actionContext);
  // "Normal" — User selected the Artboard tool to add an Artboard 🤔
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* globals log */

var console = {
  log: log,
  warn: log,
  error: log,
  dump: function (obj) {
    log('###############################################')
    log('## Dumping object ' + obj)
    if (obj.className) {
      log('## obj class is: ' + obj.className())
    }
    log('###############################################')

    if (obj.class && obj.class().mocha) {
      log('obj.properties:')
      log(obj.class().mocha().properties())
      log('obj.propertiesWithAncestors:')
      log(obj.class().mocha().propertiesWithAncestors())

      log('obj.classMethods:')
      log(obj.class().mocha().classMethods())
      log('obj.classMethodsWithAncestors:')
      log(obj.class().mocha().classMethodsWithAncestors())

      log('obj.instanceMethods:')
      log(obj.class().mocha().instanceMethods())
      log('obj.instanceMethodsWithAncestors:')
      log(obj.class().mocha().instanceMethodsWithAncestors())

      log('obj.protocols:')
      log(obj.class().mocha().protocols())
      log('obj.protocolsWithAncestors:')
      log(obj.class().mocha().protocolsWithAncestors())
    }

    if (obj.treeAsDictionary) {
      log('obj.treeAsDictionary():')
      log(obj.treeAsDictionary())
    }
  }
}

// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined'
  ? global
  : this

commonjsGlobal.console = commonjsGlobal.console || console

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['ArtboardChanged'] = run.bind(this, 'ArtboardChanged');
that['LayersMoved'] = run.bind(this, 'LayersMoved');
that['Duplicate'] = run.bind(this, 'Duplicate');
that['Resize'] = run.bind(this, 'Resize');
that['ResizeArtboardToFit'] = run.bind(this, 'ResizeArtboardToFit');
that['InsertArtboard'] = run.bind(this, 'InsertArtboard');
that['onRun'] = run.bind(this, 'default');
that['ArrangeArtboards'] = run.bind(this, 'ArrangeArtboards')
