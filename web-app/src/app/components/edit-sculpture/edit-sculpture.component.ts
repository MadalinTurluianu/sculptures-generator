import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Sculpture } from 'app/models/sculpture.model';
import { SculpturesService } from 'app/services/sculptures.service';
import { formValidators } from 'app/validators';
import { EditItemComponent } from '../shared/edit-item/edit-item.component';
import { FormComponent } from 'app/models/form-component.model';
import { generateError } from 'app/helpers/generate-error.helper';

@Component({
  selector: 'app-edit-sculpture',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    EditItemComponent,
  ],
  templateUrl: './edit-sculpture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSculptureComponent implements OnChanges, FormComponent {
  id = input<string>();

  sculpturesService = inject(SculpturesService);

  sculpture = computed(() => this.sculpturesService.getById(this.id()));

  nextLink = computed(() => {
    const nextId = this.sculpturesService.getNextId(this.sculpture()?.id);
    return nextId ? ['/sculptures', nextId] : undefined;
  });
  prevLink = computed(() => {
    const prevId = this.sculpturesService.getPreviousId(this.sculpture()?.id);
    return prevId ? ['/sculptures', prevId] : undefined;
  });

  router = inject(Router);

  form: FormGroup = new FormGroup({});

  ngOnChanges() {
    const sculpture = this.sculpture();

    this.form = new FormGroup({
      name: new FormControl<string>(sculpture?.name ?? '', {
        validators: [Validators.required, formValidators.noWhitespace],
      }),
      basePrice: new FormControl<number>(sculpture?.basePrice ?? 0, {
        validators: [
          Validators.required,
          Validators.min(0.1),
          Validators.max(100000),
        ],
      }),
      baseWeight: new FormControl<number>(sculpture?.baseWeight ?? 0, {
        validators: [
          Validators.required,
          Validators.min(0.1),
          Validators.max(99.99),
        ],
      }),
    });
  }

  formatError = generateError;

  onSubmit() {
    if (!this.form.valid) return;

    const sculpture: Sculpture = {
      id: this.sculpture()?.id ?? crypto.randomUUID(),
      name: (this.form.value.name ?? '').trim(),
      basePrice: this.form.value.basePrice ?? 0,
      baseWeight: this.form.value.baseWeight ?? 0,
    };

    this.sculpturesService.upsert(sculpture);

    this.form.markAsPristine();

    this.router.navigate(['/sculptures']);
  }
}
