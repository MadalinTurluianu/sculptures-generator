export interface Response<T> {
  status: 'error' | 'ok';
  data: T[];
}

export interface ElectronAPI {
  postItem: <T>(name: string, data: T) => Promise<Pick<Response<T>, 'status'>>;

  getItems: <T>(name: string) => Promise<Response<T>>;

  deleteItem: <T>(
    name: string,
    id: string
  ) => Promise<Pick<Response<T>, 'status'>>;

  onItemsUpdate: <T>(callback: (name: string, data: T[]) => void) => void;

  fixFocus: () => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
