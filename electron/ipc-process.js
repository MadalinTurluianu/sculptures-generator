const { ipcMain } = require("electron");
const { electronSaveData } = require("./ipc-functions/save-data");
const { electronReadData } = require("./ipc-functions/read-data");

function ipcProcess() {
  ipcMain.handle("save-data", (_event, ...args) => electronSaveData(...args));
  ipcMain.handle("read-data", (_event, ...args) => electronReadData(...args));
}

module.exports = {
  ipcProcess,
};
