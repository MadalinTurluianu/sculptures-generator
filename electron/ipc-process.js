const { ipcMain } = require("electron");
const { Store } = require("./store");

function ipcProcess(win) {
  const store = new Store((name, items) => {
    win.webContents.send("update-item", name, items);
  });

  ipcMain.handle("post-item", (_event, name, item) =>
    store.postItem(name, item)
  );

  ipcMain.handle("get-items", (_event, name) => store.getItems(name));

  ipcMain.handle("delete-item", (_event, name, id) =>
    store.deleteItem(name, id)
  );

  // This fixes the known problem with not being to focus the window after an alert or confirm
  // https://github.com/electron/electron/issues/31917
  ipcMain.on("fix-focus", () => {
    win.blur();
    win.focus();
  });
}

module.exports = {
  ipcProcess,
};
