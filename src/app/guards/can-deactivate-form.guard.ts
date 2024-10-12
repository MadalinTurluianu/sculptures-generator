import { CanDeactivateFn } from '@angular/router';

interface FormComponent {
  form: {
    dirty: boolean;
  };
  submitted: boolean;
  edited?: boolean;
}

export const canDeactivateFormGuard: CanDeactivateFn<FormComponent> = (
  component
) => {
  if (component.submitted) return true;

  if (component.form.dirty || component.edited) {
    return window.confirm(
      'Are you sure you want to leave this page? Your changes will be lost.'
    );
  }

  return true;
};
