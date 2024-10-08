import { ConfiguredSculptures } from './configured-sculpture';

export class Order {
  constructor(
    public id: string,
    public buyerName: string,
    public buyerDeliveryAddress: string,
    public configuredSculptures: ConfiguredSculptures[]
  ) {}

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
