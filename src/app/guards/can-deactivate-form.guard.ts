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
    const confirmed = window.confirm(
      'Are you sure you want to leave this page? Your changes will be lost.'
    );

    window.electronAPI?.fixFocus()

    return confirmed
  }

  return true;
};
