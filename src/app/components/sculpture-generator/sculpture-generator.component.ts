import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ConfiguredSculpture } from 'app/models/configured-sculpture';
import { Material } from 'app/models/material';
import { Sculpture } from 'app/models/sculpture';
import { SculpturesService } from 'app/services/sculptures.service';

type OnChangeFunction = (value: Partial<ConfiguredSculpture>) => void;

@Component({
  selector: 'app-sculpture-generator',
  standalone: true,
  imports: [FormsModule],
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
  sculptures = this.sculpturesService.sculptures;

  sculptureId: string | undefined;
  material: Material | undefined;
  disabled: Boolean = false;
  onChange: OnChangeFunction = () => {};
  onTouch: VoidFunction = () => {};

  changeHandler(): void {
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
