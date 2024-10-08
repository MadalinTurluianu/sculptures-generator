import { computed, Injectable, signal, Signal } from '@angular/core';
import { Sculpture } from 'app/models/sculpture';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  private savedSculptures = signal<Sculpture[]>([]);

  sculptures = this.savedSculptures.asReadonly();

  getSculptureById(id: string): Signal<Sculpture | undefined> {
    return computed(() =>
      this.savedSculptures().find((sculpture) => sculpture.id === id)
    );
  }

  upsertSculpture(sculpture: Sculpture): void {
    const index = this.savedSculptures().findIndex(
      ({ id }) => id === sculpture.id
    );

    if (index >= 0) {
      this.savedSculptures.update((sculptures) => {
        const newOrders = [...sculptures];
        newOrders[index] = sculpture;
        return newOrders;
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
