import { Injectable, OnChanges, OnInit, signal } from '@angular/core';
import { Sculpture } from 'app/models/sculpture';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  private savedSculptures = signal<Sculpture[]>([]);

  sculptures = this.savedSculptures.asReadonly();

  constructor() {
    window.electronAPI.readData('sculptures').then((savedDataJson) => {
      if (typeof savedDataJson !== 'string') return;

      const savedData = JSON.parse(savedDataJson);

      if (Array.isArray(savedData)) {
        this.savedSculptures.set(savedData);
      }
    });
  }

  save() {
    window.electronAPI.saveData(
      'sculptures',
      JSON.stringify(this.savedSculptures())
    );
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
}
