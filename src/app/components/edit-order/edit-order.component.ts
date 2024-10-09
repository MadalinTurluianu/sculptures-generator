import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Input,
  OnInit,
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
import { ConfiguredSculpture } from 'app/models/configured-sculpture';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { AddButtonComponent } from '../add-button/add-button.component';
import { formValidators } from 'app/validators';

type FormConfiguredSculpture = Partial<
  Pick<ConfiguredSculpture, 'material' | 'sculpture'>
>;

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SculptureGeneratorComponent,
    RouterLink,
    OrderSummaryComponent,
    AddButtonComponent,
  ],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent implements OnInit {
  id = input<string>();

  ordersService = inject(OrdersService);
  router = inject(Router);

  form: FormGroup = new FormGroup({});
  configuredSculptures = signal<ConfiguredSculpture[]>([]);

  ngOnInit() {
    const id = this.id();
    const order = id ? this.ordersService.getOrderById(id) : undefined;

    this.form = new FormGroup({
      buyerName: new FormControl<string>(order?.buyerName ?? '', {
        validators: [Validators.required, formValidators.noWhitespace],
      }),
      buyerDeliveryAddress: new FormControl<string>(
        order?.buyerDeliveryAddress ?? '',
        {
          validators: [Validators.required, formValidators.noWhitespace],
        }
      ),
      configuredSculpture: new FormControl<FormConfiguredSculpture>(
        {
          material: undefined,
          sculpture: undefined,
        },
        {
          validators: [formValidators.validConfiguredSculpture],
        }
      ),
    });

    this.configuredSculptures.set(order?.configuredSculptures ?? []);
  }

  totalPrice = computed(() =>
    this.configuredSculptures().reduce(
      (prev, current) => prev + current.price,
      0
    )
  );

  totalWeight = computed(() => {
    console.log(this.configuredSculptures());

    return this.configuredSculptures().reduce(
      (prev, current) => prev + current.weight,
      0
    );
  });

  onAdd() {
    if (!this.form.controls['configuredSculpture'].valid) return;

    this.configuredSculptures.update((prev) => [
      ...prev,
      new ConfiguredSculpture({
        sculpture: this.form.value.configuredSculpture.sculpture,
        material: this.form.value.configuredSculpture.material,
      }),
    ]);
  }

  onDelete(index: number) {
    this.configuredSculptures.update((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  onSubmit() {
    console.log(this.form);

    if (
      !this.form.controls['buyerName'].valid ||
      !this.form.controls['buyerDeliveryAddress'].valid ||
      this.configuredSculptures().length === 0
    ) {
      return;
    }

    this.ordersService.upsertOrder({
      id: this.id() ?? crypto.randomUUID(),
      buyerName: this.form.value.buyerName ?? '',
      buyerDeliveryAddress: this.form.value.buyerDeliveryAddress ?? '',
      configuredSculptures: this.configuredSculptures(),
      totalPrice: this.totalPrice(),
      totalWeight: this.totalWeight(),
    });

    this.router.navigate(['/orders']);
  }
}
