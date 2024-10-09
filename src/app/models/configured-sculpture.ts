import { Material } from './material';
import { Sculpture } from './sculpture';

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

  constructor(props: ConfiguredSculptureProps) {
    this.material = props.material;
    this.sculpture = props.sculpture;
  }

  get price(): number {
    return this.sculpture.basePrice * materialPrice[this.material];
  }

  get weight(): number {
    return this.sculpture.baseWeight * materialWeight[this.material];
  }
}
