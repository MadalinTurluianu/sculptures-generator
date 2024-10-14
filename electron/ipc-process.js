const { ipcMain } = require("electron");
const { electronSaveData } = require("./ipc-functions/save-data");
const { electronReadData } = require("./ipc-functions/read-data");

function ipcProcess(win) {
  ipcMain.handle("save-data", (_event, ...args) => electronSaveData(...args));
  ipcMain.handle("read-data", (_event, ...args) => electronReadData(...args));

  // This fixes the known problem with not being to focus the window after an alert or confirm\
  // https://github.com/electron/electron/issues/31917
  ipcMain.on("fix-focus", () => {
    win.blur();
    win.focus();
  });
}

module.exports = {
  ipcProcess,
};
