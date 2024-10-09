import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Sculpture } from 'app/models/sculpture';
import { SculpturesService } from 'app/services/sculptures.service';
import { formValidators } from 'app/validators';

@Component({
  selector: 'app-edit-sculpture',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-sculpture.component.html',
  styleUrl: './edit-sculpture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSculptureComponent implements OnInit {
  id = input<string>();

  sculpturesService = inject(SculpturesService);
  router = inject(Router);

  form: FormGroup = new FormGroup({});

  ngOnInit() {
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
    this.router.navigate(['/sculptures']);
  }
}
