import { app, BrowserWindow } from 'electron';
import path from 'path';
import { ipcProcess } from './ipc-process';

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcProcess(win);

  win.loadFile(
    path.join(__dirname, '../../../', 'dist/web-app/browser/index.html')
  );

  return win;
}

app.on('ready', () => {
  const win = createWindow();

  app.on('activate', () => {
    if (win === null) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
