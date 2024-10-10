import { Injectable, OnInit, Signal, signal } from '@angular/core';
import { Order } from 'app/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private savedOrders = signal<Order[]>([]);

  orders = this.savedOrders.asReadonly();

  constructor() {
    window.electronAPI.readData('orders').then((savedDataJson) => {
      if (typeof savedDataJson !== 'string') return;

      const savedData = JSON.parse(savedDataJson);

      if (Array.isArray(savedData)) {
        this.savedOrders.set(savedData);
      }
    });
  }

  save() {
    window.electronAPI.saveData('orders', JSON.stringify(this.savedOrders()));
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
}
