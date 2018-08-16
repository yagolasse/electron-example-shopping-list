const url = require('url');
const path = require('path');

const { app, ipcMain, ipcRenderer, BrowserWindow, Menu } = require('electron');
const mainMenuTemplate = require('./main-menu.controller');

let data = [];
let mainWindow;

ipcMain.on('item-add', (event, item) => {
    data.push({ 
        id: data.length + 1,
        description: item
    });
    updateWindowData();
});

ipcMain.on('item-remove', (event, item) => {
    let itemIndex;
    for(let i = 0; i < data.length; i++) {
        if(data[i].description === item) {
            itemIndex = i;
            break;
        }
    }
    if(itemIndex !== undefined) {
        data.splice(itemIndex, 1);
        updateWindowData();
    }
});

function updateWindowData() {
    mainWindow.webContents.send('item-dataUpdate', data);
}

function createMainScreen() {
    // Create new window
    mainWindow = new BrowserWindow({
        fullscreenable: false,
        resizable: false
    });
    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../view/main-window.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit when closed
    mainWindow.on('closed', () => {
        app.quit();
    });
    // Build menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}

module.exports = createMainScreen;