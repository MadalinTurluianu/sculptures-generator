import { BaseItem } from './base-Item.model';
import { ConfiguredSculpture } from './configured-sculpture.model';

export interface Order extends BaseItem {
  buyerName: string;
  buyerDeliveryAddress: string;
  configuredSculptures: ConfiguredSculpture[];
  totalPrice: number;
  totalWeight: number;
}
