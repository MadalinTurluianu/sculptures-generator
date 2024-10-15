import { Injectable, signal } from '@angular/core';
import { Sculpture } from 'app/models/sculpture';
import { loadDataFromStorage, saveDataInStorage } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService { // duplication?
  // TODO: delete this state
  private savedSculptures = signal<Sculpture[]>([]);
  // TODO: implement events from main process to renderer

  // TODO: delete this state
  sculptures = this.savedSculptures.asReadonly();

  constructor() {
    loadDataFromStorage<Sculpture>('sculptures').then((data) =>
      this.savedSculptures.set(data)
    );
  }

  save() {
    saveDataInStorage('sculptures', JSON.stringify(this.savedSculptures()));
  }





  getSculptureById(id: string): Sculpture | undefined {
    return this.savedSculptures().find((sculpture) => sculpture.id === id);
  }

  upsertSculpture(sculpture: Sculpture): void {
    const index = this.savedSculptures().findIndex(({ id }) => id === sculpture.id
);

    if (index >= 0) {
      this.savedSculptures.update((sculptures) => {
        const newSculptures = [...sculptures];
        newSculptures[index] = sculpture;
        return newSculptures;
      });
    } else {
      this.savedSculptures.update((sculptures) => {
        return [...sculptures, sculpture];
      });
    }

    this.save();
  }

  deleteSculpture(id: string): void {
    this.savedSculptures.update((sculptures) =>
      sculptures.filter((sculpture) => sculpture.id !== id)
    );

    this.save();
  }

  getNextSculptureId(currentSculptureId?: string): string | undefined {
    if (!currentSculptureId) return undefined;

    const currentIndex = this.savedSculptures().findIndex(
      ({ id }) => id === currentSculptureId
    );

    return this.savedSculptures()[currentIndex + 1]?.id;
  }

  getPreviousSculptureId(currentSculptureId?: string): string | undefined {
    if (!currentSculptureId) return undefined;

    const currentIndex = this.savedSculptures().findIndex(
      ({ id }) => id === currentSculptureId
    );

    return this.savedSculptures()[currentIndex - 1]?.id;
  }
}
