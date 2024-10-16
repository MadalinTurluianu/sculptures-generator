import { signal } from '@angular/core';
import { deleteItem, getItems, onItemsUpdate, upsertItem } from './helpers';
import { BaseItem } from 'app/models/base-Item.model';

export class StoreService<T extends BaseItem> {
  private savedItems = signal<T[]>([]);

  items = this.savedItems.asReadonly();

  getAll = async () => {
    const items = await getItems<T>(this.storeIdentifier);
    this.savedItems.set(items);
    return items;
  };

  upsert = (item: T) => upsertItem(this.storeIdentifier, item);
  delete = (id: string) => deleteItem<T>(this.storeIdentifier, id);

  constructor(private storeIdentifier: string) {
    this.getAll();

    onItemsUpdate<T>((name, items) => {
      if (name !== storeIdentifier) return;
      this.savedItems.set(items);
    });
  }

  getById(id?: string): T | undefined {
    if (!id) return undefined;
    return this.savedItems().find((item) => item.id === id);
  }

  getNextId(currentId?: string): string | undefined {
    if (!currentId) return undefined;

    const currentIndex = this.savedItems().findIndex(
      ({ id }) => id === currentId
    );

    return this.savedItems()[currentIndex + 1]?.id;
  }

  getPreviousId(currentId?: string): string | undefined {
    if (!currentId) return undefined;

    const currentIndex = this.savedItems().findIndex(
      ({ id }) => id === currentId
    );

    return this.savedItems()[currentIndex - 1]?.id;
  }
}
