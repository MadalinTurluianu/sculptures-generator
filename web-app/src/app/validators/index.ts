import { ValidatorFn } from '@angular/forms';
import { noWhitespaceValidator } from './no-whitespace.validator';
import { validConfiguredSculptureValidator } from './valid-configured-sculpture.validator';

export const formValidators = {
  noWhitespace: noWhitespaceValidator,
  validConfiguredSculpture: validConfiguredSculptureValidator,
} satisfies Record<string, ValidatorFn>;
