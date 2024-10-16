import { BaseItem } from 'app/models/base-Item.model';
import { triggerItemsUpdate } from './on-items-update.helper';

export function upsertItem<T extends BaseItem>(storageName: string, item: T) {
  if (window.electronAPI) {
    window.electronAPI.postItem(storageName, item);
  } else {
    const dataJson = localStorage.getItem(storageName);
    const data = JSON.parse(dataJson ?? '');

    const validatedData: T[] = Array.isArray(data) ? data : [];

    const existingItemIndex = validatedData.findIndex(
      ({ id }) => id === item.id
    );

    if (existingItemIndex >= 0) {
      validatedData[existingItemIndex] = item;
    } else {
      validatedData.push(item);
    }

    localStorage.setItem(storageName, JSON.stringify(validatedData));
    triggerItemsUpdate(storageName, validatedData);
  }
}
