import { BaseItem } from 'app/models/base-Item.model';

type Callback<T extends BaseItem> = (name: string, items: T[]) => void;

const callbacks: ((name: string, items: any[]) => void)[] = [];

export function onItemsUpdate<T extends BaseItem>(callback: Callback<T>) {
  if (window.electronAPI) {
    window.electronAPI?.onItemsUpdate(callback);
  } else {
    callbacks.push(callback);
  }
}

/*
storage event exists in browsers, but it doesn't trigger when storage
is updated in the same window the event is listened, it supposes
the window already knows the data is updated, so I trigger it manually
https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
*/

export function triggerItemsUpdate<T extends BaseItem>(
  name: string,
  items: T[]
) {
  callbacks.forEach((callback) => callback(name, items));
}
