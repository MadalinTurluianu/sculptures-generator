import { Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  errors = input<ValidationErrors | null>();

  message = computed<string | null>(() => {
    const errors = this.errors();

    if (!errors) return null;
    let errorMessages = [];

    if ('required' in errors || 'whitespace' in errors) {
      errorMessages.push('This field is required');
    }

    if ('minlength' in errors) {
      errorMessages.push(
        `Minimum length is ${errors['minlength'].requiredLength}`
      );
    }

    if ('min' in errors) {
      errorMessages.push(`Minimum value is ${errors['min'].min}`);
    }

    if ('max' in errors) {
      errorMessages.push(`Maximum value is ${errors['max'].max}`);
    }

    if ('empty' in errors) {
      errorMessages.push('You should add at least one item');
    }

    return errorMessages.join('. ');
  });
}
