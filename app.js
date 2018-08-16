const { app } = require('electron');

const createMainScreen = require('./controller/main-screen.controller');

// SET ENV
process.env.NODE_ENV = 'dev';

// Listen for app to be ready
app.on('ready', createMainScreen);

