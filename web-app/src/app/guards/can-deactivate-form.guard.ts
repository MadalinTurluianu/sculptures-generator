import { CanDeactivateFn } from '@angular/router';
import { FormComponent } from 'app/models/form-component.model';

export const canDeactivateFormGuard: CanDeactivateFn<FormComponent> = (
  component
) => {
  if (component.form.dirty) {
    const confirmed = window.confirm(
      'Are you sure you want to leave this page? Your changes will be lost.'
    );

    window.electronAPI?.fixFocus();

    return confirmed;
  }

  return true;
};
