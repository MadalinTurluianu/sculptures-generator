import { computed, Injectable, signal, Signal } from '@angular/core';
import { Sculpture } from 'app/models/sculpture';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  private savedSculptures = signal<Sculpture[]>([
    {
      id: '1',
      name: 'test',
      basePrice: 2,
      baseWeight: 4,
    },
  ]);

  sculptures = this.savedSculptures.asReadonly();

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
  }

  deleteSculpture(id: string): void {
    this.savedSculptures.update((sculptures) =>
      sculptures.filter((sculpture) => sculpture.id !== id)
    );
  }
}
