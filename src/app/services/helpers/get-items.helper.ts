import { BaseItem } from 'app/models/base-Item.model';

export async function getItems<T extends BaseItem>(
  storageName: string
): Promise<T[]> {
  if (window.electronAPI) {
    const response = await window.electronAPI.getItems<T>(storageName);
    return response.data;
  } else {
    const savedDataJson = localStorage.getItem(storageName);

    if (!savedDataJson) return [];

    const data = JSON.parse(savedDataJson);
    const validatedData: T[] = Array.isArray(data) ? data : [];

    return validatedData;
  }
}
