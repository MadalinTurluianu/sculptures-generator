const { app } = require("electron");
const path = require("path");
const { readFile } = require("fs").promises;

async function electronReadData(name) {
  const appDataPath = app.getPath("appData");
  const filePath = path.join(appDataPath, `${name}.json`);

  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    return {
      status: `error reading file file: ${error}`,
    };
  }
}

module.exports = {
  electronReadData,
};
