"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  postItem: (name, item) => electron.ipcRenderer.invoke("post-item", name, item),
  getItems: (name) => electron.ipcRenderer.invoke("get-items", name),
  deleteItem: (name, id) => electron.ipcRenderer.invoke("delete-item", name, id),
  onItemsUpdate: (callback) => electron.ipcRenderer.on(
    "update-item",
    (_event, name, items) => callback(name, items)
  ),
  fixFocus: () => electron.ipcRenderer.send("fix-focus")
});
