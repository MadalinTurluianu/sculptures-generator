import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validConfiguredSculptureValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (
    typeof control.value?.sculpture !== 'object' ||
    !('id' in control.value?.sculpture) ||
    !('name' in control.value?.sculpture) ||
    !('basePrice' in control.value?.sculpture) ||
    !('baseWeight' in control.value?.sculpture) ||
    typeof control.value?.material !== 'string'
  ) {
    return { invalidConfiguredSculpture: true };
  }

  return null;
}
