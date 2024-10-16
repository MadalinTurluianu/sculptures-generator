import { BaseItem } from 'app/models/base-Item.model';
import { triggerItemsUpdate } from './on-items-update.helper';

export function deleteItem<T extends BaseItem>(
  storageName: string,
  id: string
) {
  if (window.electronAPI) {
    window.electronAPI.deleteItem(storageName, id);
  } else {
    const dataJson = localStorage.getItem(storageName);
    let data = JSON.parse(dataJson ?? '');

    const validatedData: T[] = Array.isArray(data) ? data : [];
    const newData = validatedData.filter((item) => item.id !== id);

    localStorage.setItem(storageName, JSON.stringify(newData));
    triggerItemsUpdate(storageName, newData);
  }
}
