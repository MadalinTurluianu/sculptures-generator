export interface StatusObject {
  status: 'error' | 'success';
}

export interface ElectronAPI {
  saveData: (name: string, data: string) => Promise<StatusObject>;
  readData: (name: string) => Promise<string | StatusObject>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
