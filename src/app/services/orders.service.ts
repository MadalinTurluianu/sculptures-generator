import { Injectable } from '@angular/core';
import { Order } from 'app/models/order.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends StoreService<Order> {
  constructor() {
    super('orders');
  }
}
