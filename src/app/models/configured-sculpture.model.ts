import { Material } from './material.model';
import { Sculpture } from './sculpture.model';

const materialPrice = {
  [Material.Wood]: 1,
  [Material.Bronze]: 2,
  [Material.Platinum]: 18,
};

const materialWeight = {
  [Material.Wood]: 1,
  [Material.Bronze]: 12.4,
  [Material.Platinum]: 30.3,
};

interface ConfiguredSculptureProps {
  material: Material;
  sculpture: Sculpture;
}

export class ConfiguredSculpture {
  material: Material;
  sculpture: Sculpture;
  price: number;
  weight: number;

  constructor(props: ConfiguredSculptureProps) {
    this.material = props.material;
    this.sculpture = props.sculpture;
    this.price = this.sculpture.basePrice * materialPrice[this.material];
    this.weight = this.sculpture.baseWeight * materialWeight[this.material];
  }
}
