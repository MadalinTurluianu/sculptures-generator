import { BrowserWindow, ipcMain } from 'electron';
import { Store } from './store';
import { BaseItem } from './models';

export function ipcProcess(win: BrowserWindow) {
  const store = new Store((name, items) => {
    win.webContents.send('update-item', name, items);
  });

  ipcMain.handle('post-item', (_event, name: string, item: BaseItem) =>
    store.postItem(name, item)
  );

  ipcMain.handle('get-items', (_event, name: string) => store.getItems(name));

  ipcMain.handle('delete-item', (_event, name: string, id: string) =>
    store.deleteItem(name, id)
  );

  // This fixes the known problem with not being to focus the window after an alert or confirm
  // https://github.com/electron/electron/issues/31917
  ipcMain.on('fix-focus', () => {
    win.blur();
    win.focus();
  });
}
