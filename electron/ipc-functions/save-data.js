const { app } = require("electron");
const path = require("path");
const { writeFile } = require("fs").promises;

async function electronSaveData(name, data) {
  const appDataPath = app.getPath("appData");
  const filePath = path.join(appDataPath, `${name}.json`);

  try {
    await writeFile(filePath, data);
    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: `error creating file: ${error}`,
    };
  }
  s;
}

module.exports = {
  electronSaveData,
};
