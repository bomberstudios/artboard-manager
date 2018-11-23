const BrowserWindow = require("sketch-module-web-view")
const sketch = require('sketch')
const Settings = sketch.Settings
const UI = sketch.UI

export const settingsKeys = {
  GRIDHORIZONTALSPACE: "gridHorizontalSpace",
  GRIDVERTICALSPACE: "gridVerticalSpace",
  ARRANGEONADD: "arrangeOnAdd",
  RENAMEARTBOARDS: "renameArtboards",
  ARTBOARDBASENAMES: "artboardBasenames",
  MINIMUMINTEGERDIGITS: "minimumIntegerDigits",
  ARRANGESYMBOLS: "arrangeSymbols",
  ARRANGESYMBOLSPAGE: "arrangeSymbolsPage"
}

export function ArtboardSettings(context) {
  const options = {
    identifier: "artboardManagerSettings",
    width: 350,
    height: 260,
    show: false,
    resizable: true,
    title: "Artboard Manager — Settings",
    minimizable: false,
    maximizable: false,
    backgroundColor: '#ececec'
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once("ready-to-show", () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // Get Settings
  webContents.on("did-start-loading", () => {
    webContents.executeJavaScript(
      `window.settings=${JSON.stringify(getDefaultSettings())};`
    )
  })

  // add a handler for a call from web content's javascript
  webContents.on("updateSettings", d => {
    // console.log('Updating settings')
    setSettings(d)
    browserWindow.close()
  })

  browserWindow.on("closed", () => {
    // TODO: rearrange Artboards
    browserWindow = null
  })

  browserWindow.loadURL(require("../resources/settings.html"))
}

function getSettings() {
  let obj = {}
  let isUndefined = true

  Object.keys(settingsKeys).forEach(key => {
    obj[settingsKeys[key]] = Settings.settingForKey(settingsKeys[key])
    isUndefined = obj[settingsKeys[key]] === undefined
  })

  return { data: obj, isUndefined: isUndefined }
}

function setSettings(data) {
  Object.keys(data).forEach(key => {
    Settings.setSettingForKey(key, data[key])
  })
}

export function getDefaultSettings() {
  const currentSettings = getSettings()

  /* prettier-ignore */
  if (currentSettings.isUndefined) {
    let obj = {}
    obj[settingsKeys.RENAMEARTBOARDS] = false
    obj[settingsKeys.GRIDVERTICALSPACE] = 100
    obj[settingsKeys.GRIDHORIZONTALSPACE] = 50
    obj[settingsKeys.ARRANGEONADD] = false
    obj[settingsKeys.ARRANGESYMBOLS] = true
    obj[settingsKeys.ARRANGESYMBOLSPAGE] = false
    obj[settingsKeys.ARTBOARDBASENAMES] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] 
    obj[settingsKeys.MINIMUMINTEGERDIGITS] = 2
    setSettings(obj)
    return obj
  } else {
    return currentSettings.data
  }
}
