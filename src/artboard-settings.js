const BrowserWindow = require('sketch-module-web-view')
const sketch = require('sketch')
const Settings = sketch.Settings
const UI = sketch.UI

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
    let defaultSettings = getSettings()
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

export function getSettings() {
  let obj = {}
  Object.keys(defaultSettings).forEach(key => {
    obj[key] = Settings.settingForKey(key)
    if (obj[key] === undefined) {
      // This must be a new setting, so let's use the defaults
      obj[key] = defaultSettings[key]
    }
  })
  return obj
}

export function setSettings(data) {
  Object.keys(data).forEach(key => {
    Settings.setSettingForKey(key, data[key])
  })
}
