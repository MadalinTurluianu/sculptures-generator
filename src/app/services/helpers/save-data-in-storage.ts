export function saveDataInStorage(storageName: string, data: string) {
  if (window.electronAPI?.saveData) {
    window.electronAPI.saveData(storageName, data);
  } else {
    localStorage.setItem(storageName, data);
  }
}
