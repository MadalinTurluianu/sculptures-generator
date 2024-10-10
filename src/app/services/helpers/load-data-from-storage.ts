export function loadDataFromStorage(storageName: string) {
  let savedDataJson: string | undefined | null;

  if (window.electronAPI?.readData) {
    window.electronAPI.readData(storageName).then((data) => {
      if (typeof data !== 'string') return;
      savedDataJson = data;
    });
  } else {
    savedDataJson = localStorage.getItem(storageName);
  }

  if (!savedDataJson) return [];


  const savedData = JSON.parse(savedDataJson);

  if (Array.isArray(savedData)) {
    return savedData;
  }

  return [];
}
