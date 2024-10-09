import { computed, Injectable, Signal, signal } from '@angular/core';
import { Order } from 'app/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private savedOrders = signal<Order[]>([
    {
      id: '1',
      buyerName: 'test',
      buyerDeliveryAddress: 'test',
      configuredSculptures: [],
      totalPrice: 0,
      totalWeight: 0,
    },
  ]);

  orders = this.savedOrders.asReadonly();

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
  }

  deleteOrder(id: string): void {
    this.savedOrders.update((orders) =>
      orders.filter((order) => order.id !== id)
    );
  }
}
