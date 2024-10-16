import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfiguredSculpture } from 'app/models/configured-sculpture.model';
import { Material } from 'app/models/material.model';
import { SculpturesService } from 'app/services/sculptures.service';
import { MatSelectModule } from '@angular/material/select';

type OnChangeFunction = (value: Partial<ConfiguredSculpture>) => void;

@Component({
  selector: 'app-sculpture-generator',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './sculpture-generator.component.html',
  styleUrl: './sculpture-generator.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SculptureGeneratorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculptureGeneratorComponent implements ControlValueAccessor {
  materials = [Material.Wood, Material.Bronze, Material.Platinum];

  sculpturesService = inject(SculpturesService);
  sculptures = this.sculpturesService.items;

  sculptureId: string | undefined;
  material: Material | undefined;
  disabled: Boolean = false;
  onChange: OnChangeFunction = () => {};
  onTouch: VoidFunction = () => {};

  changeSculptureHandler(value: string): void {
    this.sculptureId = value;

    this.onChange({
      material: this.material,
      sculpture: this.sculptures().find(({ id }) => id === this.sculptureId),
    });
  }

  changeMaterialHandler(value: Material): void {
    this.material = value;

    this.onChange({
      material: this.material,
      sculpture: this.sculptures().find(({ id }) => id === this.sculptureId),
    });
  }

  // ControlValueAccessor

  writeValue(value: ConfiguredSculpture): void {
    this.material = value?.material;
    this.sculptureId = value?.sculpture?.id;
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focus')
  onFocus() {
    this.onTouch();
  }
}
