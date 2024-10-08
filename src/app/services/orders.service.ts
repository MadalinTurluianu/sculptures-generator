import { computed, Injectable, Signal, signal } from '@angular/core';
import { Order } from 'app/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private savedOrders = signal<Order[]>([
    new Order({
      id: '1',
      buyerName: 'test',
      buyerDeliveryAddress: 'test',
      configuredSculptures: [],
    }),
  ]);

  orders = this.savedOrders.asReadonly();

  getAllOrders(): Signal<Order[]> {
    return this.savedOrders.asReadonly();
  }

  getOrderById(id: string): Signal<Order | undefined> {
    return computed(() => this.savedOrders().find((order) => order.id === id));
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
  }

  deleteOrder(id: string): void {
    this.savedOrders.update((orders) =>
      orders.filter((order) => order.id !== id)
    );
  }
}
