// TODO: Settings window doesn't seem to be working as expected in 10.13

const BrowserWindow = require("sketch-module-web-view")
const Settings = require("sketch/settings")
const UI = require("sketch/ui")

export const settingsKeys = {
  SNAPDISTANCE: "snapDistance",
  GRIDHORIZONTALSPACE: "gridHorizontalSpace",
  GRIDVERTICALSPACE: "gridVerticalSpace",
  ARRANGEONADD: "arrangeOnAdd",
  RENAMEARTBOARDS: "renameArtboards",
  ARTBOARDBASENAMES: "artboardBasenames",
  MINIMUMINTEGERDIGITS: "minimumIntegerDigits"
}

export function ArtboardSettings(context) {
  const options = {
    identifier: "artboardManagerSettings",
    width: 242,
    height: 227,
    show: false,
    resizable: false,
    title: "Settings",
    minimizable: false,
    maximizable: false
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
    console.log('Updating settings')
    console.log(d)
    setSettings(d)
    browserWindow.close()
  })

  browserWindow.on("closed", () => {
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
    obj[settingsKeys.SNAPDISTANCE] = 300
    obj[settingsKeys.GRIDVERTICALSPACE] = 100
    obj[settingsKeys.GRIDHORIZONTALSPACE] = 50
    obj[settingsKeys.ARRANGEONADD] = false
    obj[settingsKeys.ARTBOARDBASENAMES] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] 
    obj[settingsKeys.MINIMUMINTEGERDIGITS] = 2
    setSettings(obj)
    return obj
  } else {
    return currentSettings.data
  }
}
