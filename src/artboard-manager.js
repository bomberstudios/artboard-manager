'use strict';

import WebUI from 'sketch-module-web-view'

// Config
const defaults = NSUserDefaults.standardUserDefaults()

let config = reloadConfig()

function reloadConfig(){
  return {
    renameArtboards: Boolean(defaults.objectForKey("com.bomberstudios.sketchplugins.artboard-manager.renameArtboards")) || false,
    snapDistance: Number(defaults.objectForKey("com.bomberstudios.sketchplugins.artboard-manager.snapDistance")) || 300,
    gridHorizontalSpace: Number(defaults.objectForKey("com.bomberstudios.sketchplugins.artboard-manager.gridHorizontalSpace")) || 50,
    gridVerticalSpace: Number(defaults.objectForKey("com.bomberstudios.sketchplugins.artboard-manager.gridVerticalSpace")) || 500,
    artboardBasenames: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  }
}

const sort_by_x_position = function(a,b){
  return a.frame().left() - b.frame().left();
}
const sort_by_y_position = function(a,b) {
  return a.frame().top() - b.frame().top();
}

export function ArtboardChanged(context) {
  console.log("ArtboardChanged")
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

const anArtboardIsSelected = function(context){
  console.log("anArtboardIsSelected")
  // We need a document, let's try some options:
  const doc = context.document || context.actionContext.document || NSApp.orderedDocuments().firstObject()
  const selectedLayers = doc.selectedLayers().layers()
  console.log(selectedLayers)
  if (selectedLayers.count() > 0) {
    for (const layer of Array.from(selectedLayers)) {
      if (layer.className() == "MSArtboardGroup") {
        return true
      }
    }
  }
  return false
}

export function Duplicate(context) {
  console.log('Duplicate')
  if (anArtboardIsSelected(context)) {
    ArrangeArtboards(context)
  }
}

export function LayersMoved (context) {
  console.log("LayersMoved")
  const movedLayers = Array.from(context.actionContext.layers)
  let needToArrange = false

  for (const layer of movedLayers) {
    if(layer.className() == "MSArtboardGroup") {
      needToArrange = true
    }
  }
  if (needToArrange) {
    ArrangeArtboards(context)
  }
}

export function ArrangeArtboards(context) {
  console.log("ArrangeArtboards")
  const doc = context.document || MSDocument.currentDocument()
  const originalSelection = doc.selectedLayers()
  // Running the plugin from the menu also arranges symbol masters,
  // because we don't filter by type inside this function, and
  // `page.artboards()` gives us `MSSymbolMaster`
  const artboards = doc.currentPage().artboards()

  const layoutBounds = MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers(artboards))
  // const layoutWidth  = layoutBounds.size.width
  const layoutHeight = layoutBounds.size.height
  const layoutX  = layoutBounds.origin.x
  const layoutY = layoutBounds.origin.y

  const numberOfRows = (layoutHeight / config.gridVerticalSpace).toFixed()

  let currentRow = 0
  let currentRowPosition = layoutY
  let rows = []

  while (currentRow < numberOfRows) {

    // console.log("Processing row " + currentRow + ", which starts at position: " + (currentRowPosition - layoutY))
    let currentRowArtboards = []
    for (const artboard of Array.from(artboards)) {
      if(Math.abs(artboard.frame().y() - currentRowPosition) <= config.snapDistance ) {
        artboard.frame().y = currentRowPosition
        currentRowArtboards.push(artboard)
      }
    }
    if (currentRowArtboards.length > 0) {
      rows.push(currentRowArtboards)
    }
    currentRowPosition += config.gridVerticalSpace
    currentRow++
  }

  // Now, update positions for all artboards
  let verticalOffset = 0
  let rowNumber = 0
  for (const row of rows) {

    // Vertical positions
    let tallestArtboard = 0
    for (const artboard of row) {
      artboard.frame().y = verticalOffset + layoutY
      tallestArtboard = Math.max(tallestArtboard, artboard.frame().height())
    }
    verticalOffset += tallestArtboard + (config.gridVerticalSpace/2)

    // Horizontal positions & name
    let offsetX = 0
    let columnNumber = 1
    for (const artboard of row.sort(sort_by_x_position)) {
      artboard.frame().x = layoutX + offsetX
      offsetX += artboard.frame().width() + config.gridHorizontalSpace
      if (config.renameArtboards) {
        artboard.setName(config.artboardBasenames[rowNumber] + columnNumber)
      }
      columnNumber++
    }
    rowNumber++
  }

  // Update stacking
  for (const artboard of Array.from(artboards).sort(sort_by_x_position).sort(sort_by_y_position)) {
    const parent = artboard.parentGroup()
    artboard.removeFromParent()
    parent.insertLayer_atIndex(artboard, 0)
  }
  // Restore original selection
  for (const layer of Array.from(originalSelection)) {
    layer.isSelected = true
  }
}

export function Resize(context){
  console.log("Resize")
  // console.log(context)
  // console.log(context.actionContext)
  if (context.actionContext.name == "NormalResize" || context.actionContext.name == "NormalMultipleResize" || context.action == "ResizeArtboardToFit.finish") {
    if (anArtboardIsSelected(context)) {
      ArrangeArtboards(context)
    }
  }
}

export function ResizeArtboardToFit(context){
  Resize(context)
}

function storePreferences(obj){
  console.log("Storing preferences")
  defaults.setObject_forKey(obj.renameArtboards,"com.bomberstudios.sketchplugins.artboard-manager.renameArtboards")
  defaults.setObject_forKey(obj.snapDistance,"com.bomberstudios.sketchplugins.artboard-manager.snapDistance")
  defaults.setObject_forKey(obj.gridVerticalSpace,"com.bomberstudios.sketchplugins.artboard-manager.gridVerticalSpace")
  defaults.setObject_forKey(obj.gridHorizontalSpace,"com.bomberstudios.sketchplugins.artboard-manager.gridHorizontalSpace")
  config = reloadConfig()
}

export function ShowPreferences(context){
  const options = {
    identifier: 'com.bomberstudios.sketchplugins.artboard-manager',
    // styleMask: (NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask),
    width: 500,
    height: 200,
    background: NSColor.whiteColor(),
    // onlyShowCloseButton: false,
    title: 'Artboard Manager — Settings',
    // hideTitleBar: true,
    // styleMask: (NSFullSizeContentViewWindowMask | NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask),
    frameLoadDelegate: {
      'webView:didFinishLoadForFrame:': function (webView, webFrame) {
        const configString = JSON.stringify(config)
        preferencesUI.eval(`populateFormValues(${configString})`)
      }
    },
    uiDelegate: {},
    handlers: {
      storePreferences: function(obj){
        storePreferences(obj);
      }
    }
  }
  const preferencesUI = new WebUI(context, 'artboard-manager.html', options)
}
