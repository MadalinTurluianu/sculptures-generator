import { ConfiguredSculptures } from './configured-sculpture';

interface OrderProps {
  id: string;
  buyerName: string;
  buyerDeliveryAddress: string;
  configuredSculptures: ConfiguredSculptures[];
}

export class Order {
  id: string;
  buyerName: string;
  buyerDeliveryAddress: string;
  configuredSculptures: ConfiguredSculptures[];

  constructor(order: OrderProps) {
    this.id = order.id;
    this.buyerName = order.buyerName;
    this.buyerDeliveryAddress = order.buyerDeliveryAddress;
    this.configuredSculptures = order.configuredSculptures;
  }

  get totalPrice(): number {
    return this.configuredSculptures.reduce(
      (prev, current) => prev + current.price,
      0
    );
  }

  get totalWeight(): number {
    return this.configuredSculptures.reduce(
      (prev, current) => prev + current.weight,
      0
    );
  }
}
