import { AbstractControl, ValidationErrors } from '@angular/forms';

// why is this needed?
export function validConfiguredSculptureValidator(
  control: AbstractControl
): ValidationErrors | null {
  return null;
}
