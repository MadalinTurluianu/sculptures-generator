import { Component, input } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [ErrorMessageComponent],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  errors = input<ValidationErrors | null>();
}
