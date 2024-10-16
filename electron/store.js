const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class Store {
  storePath = path.join(app.getPath("appData"), "store");

  debouncedItems = {};

  getFilePath(name) {
    return path.join(this.storePath, `${name}.json`);
  }

  constructor(emitChange) {
    fs.promises
      .mkdir(this.storePath)
      .catch(() => {})
      .finally(() => {
        fs.watch(this.storePath, undefined, async (eventType, fileName) => {
          if (eventType !== "change") return;

          const name = fileName.replace(".json", "");
          const { data } = await this.getItems(name);

          emitChange(name, data);
        });
      });
  }

  async getItems(name) {
    const faultResponse = { status: "error", data: [] };

    try {
      const jsonData = await fs.promises
        .readFile(this.getFilePath(name), "utf8")
        .catch(() => null);

      if (!jsonData) return faultResponse;

      const data = JSON.parse(jsonData);

      if (!Array.isArray(data)) return faultResponse;

      return { status: "ok", data: data };
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
      // then the watch listener will trigger the emitChange

      return {
        status: "ok",
      };
    } catch (error) {
      console.log("postItem error: ", error);

      return {
        status: "error",
      };
    }
  }

  async deleteItem(name, id) {
    try {
      const items = await this.getItems(name);

      const existingItemIndex = items.findIndex((item) => id === item.id);

      if (existingItemIndex < 0) throw new Error();

      items.splice(existingItemIndex, 1);

      await fs.promises.writeFile(
        this.getFilePath(name),
        JSON.stringify(items)
      );
      // then the watch listener will trigger the emitChange

      return {
        status: "ok",
      };
    } catch (error) {
      console.log("deleteItem error: ", error);

      return {
        status: "error",
      };
    }
  }
}

module.exports = { Store };
