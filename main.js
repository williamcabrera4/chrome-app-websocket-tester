'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    frame: true,
    width: 900,
    height: 670,
    minWidth: 900,
    minHeight: 670,
  });

  mainWindow.loadURL(path.join('file://',  __dirname  , 'dist/index.html'));
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});
