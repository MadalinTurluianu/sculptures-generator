const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcProcess } = require("./electron/ipc-process");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "electron/preload.js"),
    },
  });

  ipcProcess();

  win.loadFile(
    path.join(__dirname, `dist/sculptures-generator/browser/index.html`)
  );

  // Open the DevTools.
  // win.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (win === null) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
