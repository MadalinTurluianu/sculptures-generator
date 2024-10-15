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
import { Sculpture } from 'app/models/sculpture';
import { SculpturesService } from 'app/services/sculptures.service';
import { formValidators } from 'app/validators';
import { EditItemComponent } from '../shared/edit-item/edit-item.component';
import { FormErrorComponent } from '../shared/form-error/form-error.component';

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
    FormErrorComponent,
  ],
  templateUrl: './edit-sculpture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSculptureComponent implements OnChanges {
  id = input<string>();

  sculpturesService = inject(SculpturesService);

  nextLink = computed(() => {
    const nextId = this.sculpturesService.getNextSculptureId(this.id());
    return nextId ? ['/sculptures', nextId] : undefined;
  });
  prevLink = computed(() => {
    const prevId = this.sculpturesService.getPreviousSculptureId(this.id());
    return prevId ? ['/sculptures', prevId] : undefined;
  });

  router = inject(Router);
  submitted = false;

  form: FormGroup = new FormGroup({});

  ngOnChanges() {
    const id = this.id();
    const sculpture = id
      ? this.sculpturesService.getSculptureById(id)
      : undefined;

    this.form = new FormGroup({
      name: new FormControl<string>(sculpture?.name ?? '', {
        validators: [Validators.required, formValidators.noWhitespace],
      }),
      basePrice: new FormControl<number>(sculpture?.basePrice ?? 0, {
        validators: [Validators.required, Validators.min(0.1)],
      }),
      baseWeight: new FormControl<number>(sculpture?.baseWeight ?? 0, {
        validators: [Validators.required, Validators.min(0.1)],
      }),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    const sculpture: Sculpture = {
      id: this.id() ?? crypto.randomUUID(),
      name: this.form.value.name ?? '',
      basePrice: this.form.value.basePrice ?? 0,
      baseWeight: this.form.value.baseWeight ?? 0,
    };

    this.sculpturesService.upsertSculpture(sculpture);

    this.submitted = true;
    this.router.navigate(['/sculptures']);
  }
}
