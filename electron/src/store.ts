import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { BaseItem } from './models';

interface Response {
  status: 'error' | 'ok';
  data: BaseItem[];
}

export type EmitChange = (name: string, data: BaseItem[]) => void;

export class Store {
  storePath = path.join(app.getPath('appData'), 'store');

  getFilePath(name: string) {
    return path.join(this.storePath, `${name}.json`);
  }

  constructor(emitChange: EmitChange) {
    fs.promises
      .mkdir(this.storePath)
      .catch((error) => console.log(error))
      .finally(() => {
        fs.watch(
          this.storePath,
          undefined,
          async (eventType, fileName: string) => {
            if (eventType !== 'change') return;

            const name = fileName.replace('.json', '');
            const { data } = await this.getItems(name);

            emitChange(name, data);
          }
        );
      });
  }

  async getItems(name: string) {
    const faultResponse: Response = { status: 'error', data: [] };

    try {
      const jsonData = await fs.promises
        .readFile(this.getFilePath(name), 'utf8')
        .catch(() => '');

      if (!jsonData) return faultResponse;

      const data = JSON.parse(jsonData);

      if (!Array.isArray(data)) return faultResponse;

      return { status: 'ok', data: data as BaseItem[] };
    } catch (error) {
      console.log('getItems error: ', error);

      return { status: 'error', data: [] };
    }
  }

  async postItem(name: string, item: BaseItem) {
    try {
      const { data: items } = await this.getItems(name);

      const existingItemIndex = items.findIndex(({ id }) => id === item.id);

      if (existingItemIndex >= 0) {
        items[existingItemIndex] = item;
      } else {
        items.push(item);
      }

      await fs.promises.writeFile(
        this.getFilePath(name),
        JSON.stringify(items)
      );
      // then the watch listener will trigger the emitChange

      return {
        status: 'ok',
      };
    } catch (error) {
      console.log('postItem error: ', error);

      return {
        status: 'error',
      };
    }
  }

  async deleteItem(name: string, id: string) {
    try {
      const { data: items } = await this.getItems(name);

      const existingItemIndex = items.findIndex((item) => id === item.id);

      if (existingItemIndex < 0) throw new Error();

      items.splice(existingItemIndex, 1);

      await fs.promises.writeFile(
        this.getFilePath(name),
        JSON.stringify(items)
      );
      // then the watch listener will trigger the emitChange

      return {
        status: 'ok',
      };
    } catch (error) {
      console.log('deleteItem error: ', error);

      return {
        status: 'error',
      };
    }
  }
}
