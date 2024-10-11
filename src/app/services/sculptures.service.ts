import { Injectable, signal } from '@angular/core';
import { Sculpture } from 'app/models/sculpture';
import { loadDataFromStorage, saveDataInStorage } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  private savedSculptures = signal<Sculpture[]>([]);

  sculptures = this.savedSculptures.asReadonly();

  constructor() {
    const savedData = loadDataFromStorage('sculptures');
    this.savedSculptures.set(savedData);
  }

  save() {
    saveDataInStorage('sculptures', JSON.stringify(this.savedSculptures()));
  }

  getSculptureById(id: string): Sculpture | undefined {
    return this.savedSculptures().find((sculpture) => sculpture.id === id);
  }

  upsertSculpture(sculpture: Sculpture): void {
    const index = this.savedSculptures().findIndex(
      ({ id }) => id === sculpture.id
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
