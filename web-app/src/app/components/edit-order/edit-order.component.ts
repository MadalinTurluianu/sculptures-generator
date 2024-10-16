import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnChanges,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from 'app/services/orders.service';
import { SculptureGeneratorComponent } from '../sculpture-generator/sculpture-generator.component';
import { Router, RouterLink } from '@angular/router';
import { ConfiguredSculpture } from 'app/models/configured-sculpture.model';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { formValidators } from 'app/validators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { EditItemComponent } from '../shared/edit-item/edit-item.component';
import { AddButtonComponent } from '../shared/add-button/add-button.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { FormComponent } from 'app/models/form-component.model';
import { generateError } from 'app/helpers/generate-error.helper';

type FormConfiguredSculpture = Pick<
  ConfiguredSculpture,
  'material' | 'sculpture'
>;

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SculptureGeneratorComponent,
    RouterLink,
    OrderSummaryComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    EditItemComponent,
    AddButtonComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent implements OnChanges, FormComponent {
  id = input<string>();

  ordersService = inject(OrdersService);

  order = computed(() => this.ordersService.getById(this.id()));

  router = inject(Router);

  errorMessage = signal<string>('');

  configuredSculptures = signal<ConfiguredSculpture[]>([]);

  totalPrice = computed(() => {
    return this.configuredSculptures().reduce(
      (prev, current) => prev + current.price,
      0
    );
  });

  totalWeight = computed(() => {
    return this.configuredSculptures().reduce(
      (prev, current) => prev + current.weight,
      0
    );
  });

  form = new FormGroup({
    buyerName: new FormControl<string>('', {
      validators: [Validators.required, formValidators.noWhitespace],
    }),
    buyerDeliveryAddress: new FormControl<string>('', {
      validators: [Validators.required, formValidators.noWhitespace],
    }),
    configuredSculpture: new FormControl<Partial<FormConfiguredSculpture>>(
      {
        material: undefined,
        sculpture: undefined,
      },
      {
        validators: [formValidators.validConfiguredSculpture],
      }
    ),
  });

  nextLink = computed(() => {
    const nextId = this.ordersService.getNextId(this.order()?.id);
    return nextId ? ['/orders', nextId] : undefined;
  });

  prevLink = computed(() => {
    const prevId = this.ordersService.getPreviousId(this.order()?.id);
    return prevId ? ['/orders', prevId] : undefined;
  });

  ngOnChanges() {
    this.resetForm();
  }

  onAdd() {
    const control = this.form.controls['configuredSculpture'];
    if (!control.valid) return;

    const validatedValue = control.value as FormConfiguredSculpture;

    this.configuredSculptures.update((prev) => [
      ...prev,
      new ConfiguredSculpture({
        sculpture: validatedValue.sculpture,
        material: validatedValue.material,
      }),
    ]);

    this.form.markAsDirty();
  }

  onDelete(index: number) {
    this.configuredSculptures.update((prev) =>
      prev.filter((_, i) => i !== index)
    );

    this.form.markAsDirty();
  }

  onSubmit() {
    if (
      !this.form.controls['buyerName'].valid ||
      !this.form.controls['buyerDeliveryAddress'].valid
    ) {
      return;
    }

    if (this.configuredSculptures().length === 0) {
      this.errorMessage.set('Please add at least one sculpture.');
      return;
    }

    if (this.totalWeight() > 100) {
      this.errorMessage.set('Total weight should not exceed 100 kg.');
      return;
    }

    this.ordersService.upsert({
      id: this.order()?.id ?? crypto.randomUUID(),
      buyerName: (this.form.value.buyerName ?? '').trim(),
      buyerDeliveryAddress: (this.form.value.buyerDeliveryAddress ?? '').trim(),
      configuredSculptures: this.configuredSculptures(),
      totalPrice: this.totalPrice(),
      totalWeight: this.totalWeight(),
    });

    this.form.markAsPristine();

    this.router.navigate(['/orders']);

    this.resetForm();
  }

  formatError = generateError;

  resetForm() {
    this.errorMessage.set('');
    this.form.reset();

    const order = this.order();

    if (order) {
      this.form.patchValue({
        buyerName: order?.buyerName,
        buyerDeliveryAddress: order?.buyerDeliveryAddress,
      });
    }

    this.configuredSculptures.set(order?.configuredSculptures ?? []);
  }
}
