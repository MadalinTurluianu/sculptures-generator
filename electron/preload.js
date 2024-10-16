const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  postItem: (name, item) => ipcRenderer.invoke("post-item", name, item),

  getItems: (name) => ipcRenderer.invoke("get-items", name),

  deleteItem: (name, id) => ipcRenderer.invoke("delete-item", name, id),

  onItemsUpdate: (callback) =>
    ipcRenderer.on("update-item", (_event, name, data) => callback(name, data)),

  fixFocus: () => ipcRenderer.send("fix-focus"),
});
