const url = require('url');
const path = require('path');

const { BrowserWindow, ipcMain, Menu, remote } = require('electron');

let addWindow;

// Catch item-add
ipcMain.on('item-add', (event, item) => {
    const mainMenu = Menu.buildFromTemplate(require('./main-menu.controller'));
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    addWindow.close();
});

// Create Add Window
function createAddWindow() {
    // Create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item',
        fullscreenable: false,
        resizable: false
    });
    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../view/add-window.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collector handle
    addWindow.on('close', () => {
        addWindow = null;
    });
    // Making menu bar doesnt appear 
    Menu.setApplicationMenu(null);
}

module.exports = createAddWindow;