const sketch = require('sketch')
const UI = sketch.UI
import { getDefaultSettings } from "./artboard-settings.js"

// Config
let config = getDefaultSettings()

const sort_by_x_position = function(a,b){
  return a.frame.x - b.frame.x
}
const sort_by_y_position = function(a,b) {
  return a.frame.y - b.frame.y
}

export function ArtboardChanged(context) {
  // console.log("ArtboardChanged")
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
  // console.log("anArtboardIsSelected")
  // We need a document, let's try some options:
  const doc = context.document || context.actionContext.document || NSApp.orderedDocuments().firstObject()
  const selectedLayers = doc.selectedLayers().layers()
  // console.log(selectedLayers)
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
  // console.log('Duplicate')
  if (anArtboardIsSelected(context)) {
    ArrangeArtboards(context)
  }
}

export function LayersMoved (context) {
  // console.log("LayersMoved")
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
  const doc = sketch.getSelectedDocument()
  const originalSelection = doc.selectedLayers
  const artboards = doc.selectedPage.layers.filter(layer => layer.type == 'Artboard')

  const nativeArtboards = artboards.map(artboard => artboard.sketchObject)

  const layoutBounds = MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers(nativeArtboards))

  const layoutWidth  = layoutBounds.size.width
  const layoutHeight = layoutBounds.size.height

  // This will be the starting point for our Artboard Grid
  const layoutX  = layoutBounds.origin.x
  const layoutY = layoutBounds.origin.y

  // Dynamic snapping distance, based on Artboard size.
  var averageHeight = artboards.reduce((initial, artboard) => {
    initial += artboard.frame.height
    return initial
  },0) / artboards.length
  var maxHeight = artboards.reduce((initial, artboard) => {
    if (artboard.frame.height > initial) {
      initial = artboard.frame.height
    }
    return initial
  },0)

  var snapDistance = averageHeight // This one works great with mixed sizes
  // var snapDistance = config.snapDistance // Removed, defaulted to 300
  // var snapDistance = maxHeight

  // First, snap all Artboards to the grid, to group them by rows
  // They may overlap, but we'll fix that in a minute
  artboards.forEach(artboard => {
    artboard.frame.y = snapValueToGrid(artboard.frame.y, snapDistance)
  })

  var artboardRows = artboards.sort(sort_by_y_position).reduce((initial, artboard) => {
    initial.push(artboard.frame.y)
    return initial
  }, [])

  // Set X position for all Artboards on each row
  const artboardRowValues = [...new Set(artboardRows)]//.sort()
  var artboardY = layoutY
  var currentRow = 0
  artboardRowValues.forEach(rowValue => {
    var tallestArtboard = 0
    var artboardX = layoutX
    var artboardsInRow = artboards.filter(artboard => artboard.frame.y == rowValue)
    artboardsInRow.sort(sort_by_x_position).forEach((artboard, index) => {
      var currentColumn = index + 1
      artboard.frame.x = artboardX
      artboard.frame.y = artboardY
      artboardX += artboard.frame.width + config.gridHorizontalSpace
      if (artboard.frame.height > tallestArtboard) {
        tallestArtboard = artboard.frame.height
      }
      if (config.renameArtboards) {
        artboard.name = config.artboardBasenames[currentRow] + currentColumn.toLocaleString('en-US', {minimumIntegerDigits: config.minimumIntegerDigits, useGrouping:false})
      }
    })
    artboardY += tallestArtboard + config.gridVerticalSpace
    currentRow++
  })

  // Update stacking
  artboards.sort(sort_by_x_position).sort(sort_by_y_position).forEach(artboard => {
    const parent = artboard.parent
    artboard.remove()
    parent._object.insertLayer_atIndex(artboard._object, 0)
  })

  // Restore original selection
  originalSelection.forEach(artboard => artboard.selected = true)

  UI.message('Artboards arranged')
}

export function Resize(context){
  // console.log("Resize")
  // console.log(context)
  // console.log(context.actionContext)
  // "Normal" — User selected the Artboard tool to add an Artboard 🤔
  if (context.actionContext.name == "NormalResize" || context.actionContext.name == "NormalMultipleResize" || context.action == "ResizeArtboardToFit.finish") {
    if (anArtboardIsSelected(context)) {
      ArrangeArtboards(context)
    }
  }
  if (context.actionContext.name == "InsertArtboard" && config.arrangeOnAdd) {
    ArrangeArtboards(context)
  }
}

export function ResizeArtboardToFit(context){
  // console.log("ResizeArtboardToFit")
  Resize(context)
}

export function InsertArtboard(context){
  // console.log('InsertArtboard');
}

function snapValueToGrid(value, grid) {
  var div = value/grid
  // Also snap down, so the Artboard doesn't jump to the row above if we're only 1 px above the snapping line
  var rest = div - Math.floor(div)
  if (rest > 0.8) {
    div += 1
  }
  return Math.floor(Math.floor(div) * grid)
}