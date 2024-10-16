import { Injectable } from '@angular/core';
import { Sculpture } from 'app/models/sculpture.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService extends StoreService<Sculpture> {
  constructor() {
    super('sculptures');
  }
}
