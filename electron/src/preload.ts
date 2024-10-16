import { contextBridge, ipcRenderer } from 'electron';
import { BaseItem } from './models';
import { EmitChange } from './store';

contextBridge.exposeInMainWorld('electronAPI', {
  postItem: (name: string, item: BaseItem) =>
    ipcRenderer.invoke('post-item', name, item),

  getItems: (name: string) => ipcRenderer.invoke('get-items', name),

  deleteItem: (name: string, id: string) =>
    ipcRenderer.invoke('delete-item', name, id),

  onItemsUpdate: (callback: EmitChange) =>
    ipcRenderer.on('update-item', (_event, name, items) =>
      callback(name, items)
    ),

  fixFocus: () => ipcRenderer.send('fix-focus'),
});
