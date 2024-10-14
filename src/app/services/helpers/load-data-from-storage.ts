export async function loadDataFromStorage<T>(
  storageName: string
): Promise<T[]> {
  let savedDataJson: string | undefined | null;

  if (window.electronAPI?.readData) {
    const data = await window.electronAPI.readData(storageName);

    if (typeof data !== 'string') return [];

    savedDataJson = data;
  } else {
    savedDataJson = localStorage.getItem(storageName);
  }

  if (!savedDataJson) return [];

  const savedData = JSON.parse(savedDataJson);

  if (Array.isArray(savedData)) {
    console.log(3, savedData);

    return savedData;
  }

  return [];
}
