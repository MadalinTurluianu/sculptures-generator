import { ValidatorFn } from '@angular/forms';
import { noWhitespaceValidator } from './no-whitespace';
import { validConfiguredSculptureValidator } from './valid-configured-sculpture';

export const formValidators = {
  noWhitespace: noWhitespaceValidator,
  validConfiguredSculpture: validConfiguredSculptureValidator,
} satisfies Record<string, ValidatorFn>;
