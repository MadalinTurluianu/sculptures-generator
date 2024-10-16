import { BaseItem } from './base-Item.model';

export interface Sculpture extends BaseItem {
  name: string;
  basePrice: number;
  baseWeight: number;
}
