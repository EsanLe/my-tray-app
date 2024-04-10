const { nativeImage, app, Tray, Menu } = require('electron')
const path = require('path')
let tray = null

Menu.setApplicationMenu(false)

const EXTRA_RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'extraResources')
  : path.join(__dirname, 'extraResources');  // Your relative path may be different!

const getAssetPath = (resourceFilename) => {
  return path.join(EXTRA_RESOURCES_PATH, resourceFilename);
};

const image = nativeImage.createFromPath(getAssetPath('trayIcons/active-light.png'));
console.log(image)

app.whenReady().then(() => {
  tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    // Add more menu items as needed
    { type: 'separator' }, // This adds a visual separator between menu items
    {
      label: 'Quit',
      click: () => {
        app.quit();
      } // This will quit the app when clicked
    }
  ])
  tray.setToolTip('This is my tray app')
  tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', (event) => {
  event.preventDefault()
})
