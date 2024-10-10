const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  saveData: (...args) => ipcRenderer.invoke("save-data", ...args),
  readData: (...args) => ipcRenderer.invoke("read-data", ...args),
});
