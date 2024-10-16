"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const electron = require("electron");
const path = require("path");
const fs = require("fs");
class Store {
  constructor(emitChange) {
    __publicField(this, "storePath", path.join(electron.app.getPath("appData"), "store"));
    fs.promises.mkdir(this.storePath).catch((error) => console.log(error)).finally(() => {
      fs.watch(
        this.storePath,
        void 0,
        async (eventType, fileName) => {
          if (eventType !== "change") return;
          const name = fileName.replace(".json", "");
          const { data } = await this.getItems(name);
          emitChange(name, data);
        }
      );
    });
  }
  getFilePath(name) {
    return path.join(this.storePath, `${name}.json`);
  }
  async getItems(name) {
    const faultResponse = { status: "error", data: [] };
    try {
      const jsonData = await fs.promises.readFile(this.getFilePath(name), "utf8").catch(() => "");
      if (!jsonData) return faultResponse;
      const data = JSON.parse(jsonData);
      if (!Array.isArray(data)) return faultResponse;
      return { status: "ok", data };
    } catch (error) {
      console.log("getItems error: ", error);
      return { status: "error", data: [] };
    }
  }
  async postItem(name, item) {
    try {
      const { data: items } = await this.getItems(name);
      const existingItemIndex = items.findIndex(({ id }) => id === item.id);
      if (existingItemIndex >= 0) {
        items[existingItemIndex] = item;
      } else {
        items.push(item);
      }
      await fs.promises.writeFile(
        this.getFilePath(name),
        JSON.stringify(items)
      );
      return {
        status: "ok"
      };
    } catch (error) {
      console.log("postItem error: ", error);
      return {
        status: "error"
      };
    }
  }
  async deleteItem(name, id) {
    try {
      const { data: items } = await this.getItems(name);
      const existingItemIndex = items.findIndex((item) => id === item.id);
      if (existingItemIndex < 0) throw new Error();
      items.splice(existingItemIndex, 1);
      await fs.promises.writeFile(
        this.getFilePath(name),
        JSON.stringify(items)
      );
      return {
        status: "ok"
      };
    } catch (error) {
      console.log("deleteItem error: ", error);
      return {
        status: "error"
      };
    }
  }
}
function ipcProcess(win) {
  const store = new Store((name, items) => {
    win.webContents.send("update-item", name, items);
  });
  electron.ipcMain.handle(
    "post-item",
    (_event, name, item) => store.postItem(name, item)
  );
  electron.ipcMain.handle("get-items", (_event, name) => store.getItems(name));
  electron.ipcMain.handle(
    "delete-item",
    (_event, name, id) => store.deleteItem(name, id)
  );
  electron.ipcMain.on("fix-focus", () => {
    win.blur();
    win.focus();
  });
}
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  ipcProcess(win);
  win.loadFile(
    path.join(__dirname, "../../../", "dist/web-app/browser/index.html")
  );
  return win;
}
electron.app.on("ready", () => {
  const win = createWindow();
  electron.app.on("activate", () => {
    if (win === null) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
