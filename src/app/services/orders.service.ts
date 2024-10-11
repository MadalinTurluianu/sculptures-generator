import { Injectable, Signal, signal } from '@angular/core';
import { Order } from 'app/models/order';
import { loadDataFromStorage, saveDataInStorage } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private savedOrders = signal<Order[]>([]);

  orders = this.savedOrders.asReadonly();

  constructor() {
    const savedData = loadDataFromStorage('orders');
    this.savedOrders.set(savedData);
  }

  save() {
    saveDataInStorage('orders', JSON.stringify(this.savedOrders()));
  }

  getAllOrders(): Signal<Order[]> {
    return this.savedOrders.asReadonly();
  }

  getOrderById(id: string): Order | undefined {
    return this.savedOrders().find((order) => order.id === id);
  }

  upsertOrder(order: Order): void {
    const index = this.savedOrders().findIndex(({ id }) => id === order.id);

    if (index >= 0) {
      this.savedOrders.update((orders) => {
        const newOrders = [...orders];
        newOrders[index] = order;
        return newOrders;
      });
    } else {
      this.savedOrders.update((orders) => {
        return [...orders, order];
      });
    }

    this.save();
  }

  deleteOrder(id: string): void {
    this.savedOrders.update((orders) =>
      orders.filter((order) => order.id !== id)
    );

    this.save();
  }

  getNextOrderId(currentOrderId?: string): string | undefined {
    if (!currentOrderId) return undefined;

    const currentIndex = this.savedOrders().findIndex(
      ({ id }) => id === currentOrderId
    );

    return this.savedOrders()[currentIndex + 1]?.id;
  }

  getPreviousOrderId(currentOrderId?: string): string | undefined {
    if (!currentOrderId) return undefined;

    const currentIndex = this.savedOrders().findIndex(
      ({ id }) => id === currentOrderId
    );

    return this.savedOrders()[currentIndex - 1]?.id;
  }
}
