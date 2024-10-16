import { ValidationErrors } from '@angular/forms';

const ERROR_MESSAGES_MAP = new Map([
  ['required', 'This field is required'],
  ['min', 'Minimum value is'],
  ['max', 'Maximum value is'],
]);

export function generateError(errors?: ValidationErrors | null) {
  if (!errors) return null;
  const errorMessages: string[] = [];

  Object.keys(errors).forEach((key) => {
    const error = ERROR_MESSAGES_MAP.get(key);
    const additionalInfo = errors[key][key];

    if (error)
      errorMessages.push(
        `${error}${additionalInfo ? ' ' + additionalInfo : ''}`
      );
  });

  return errorMessages.join('. ');
}
