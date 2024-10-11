import { CanDeactivateFn } from '@angular/router';

interface FormComponent {
  form: {
    dirty: boolean;
  };
  submitted: boolean;
}

export const canDeactivateForm: CanDeactivateFn<FormComponent> = (
  component
) => {
  if (component.submitted) return true;

  if (component.form.dirty) {
    return window.confirm(
      'Are you sure you want to leave this page? Your changes will be lost.'
    );
  }
  
  return true;
};
