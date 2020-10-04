const BrowserWindow = require('sketch-module-web-view')
const sketch = require('sketch')
const Settings = sketch.Settings
const UI = sketch.UI

export const settingsKeys = {
  GRIDHORIZONTALSPACE: 'gridHorizontalSpace',
  GRIDVERTICALSPACE: 'gridVerticalSpace',
  RENAMEARTBOARDS: 'renameArtboards',
  ARTBOARDBASENAMES: 'artboardBasenames',
  MINIMUMINTEGERDIGITS: 'minimumIntegerDigits',
  ARRANGESYMBOLS: 'arrangeSymbols',
  ARRANGESYMBOLSPAGE: 'arrangeSymbolsPage',
  EXCLUDEPATTERN: 'excludePattern',
  AUTOMODE: 'autoMode',
}

const defaultSettings = {
  gridHorizontalSpace: 50,
  gridVerticalSpace: 100,
  renameArtboards: false,
  artboardBasenames: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  minimumIntegerDigits: 2,
  arrangeSymbols: true,
  arrangeSymbolsPage: false,
  excludePattern: '--',
  autoMode: true,
}

export function ArtboardSettings(context) {
  const options = {
    identifier: 'artboardManagerSettings',
    width: 350,
    height: 280,
    show: false,
    resizable: false,
    title: 'Artboard Manager — Settings',
    minimizable: false,
    maximizable: false,
    backgroundColor: '#ececec',
    hidesOnDeactivate: false,
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // Get Settings
  webContents.on('did-start-loading', () => {
    let defaultSettings = getDefaultSettings()
    webContents.executeJavaScript(
      `window.settings=${JSON.stringify(defaultSettings)}; populateSettings()`
    )
  })

  // add a handler for a call from web content's javascript
  webContents.on('updateSettings', d => {
    // console.log('Updating settings')
    setSettings(d)
    browserWindow.close()
  })

  browserWindow.on('closed', () => {
    browserWindow = null
  })

  browserWindow.loadURL(require('../resources/settings.html'))
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

  // TODO: we need to support newly introduced settings
  // For that, we need to check for each setting and see if it's undefined
  /* prettier-ignore */
  if (currentSettings.isUndefined) {
    let obj = {}
    obj[settingsKeys.RENAMEARTBOARDS] = false
    obj[settingsKeys.GRIDVERTICALSPACE] = 100
    obj[settingsKeys.GRIDHORIZONTALSPACE] = 50
    obj[settingsKeys.ARRANGESYMBOLS] = true
    obj[settingsKeys.ARRANGESYMBOLSPAGE] = false
    obj[settingsKeys.EXCLUDEPATTERN] = "--"
    obj[settingsKeys.ARTBOARDBASENAMES] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    obj[settingsKeys.MINIMUMINTEGERDIGITS] = 2
    obj[settingsKeys.AUTOMODE] = true
    setSettings(obj)
    return obj
  } else {
    return currentSettings.data
  }
}
