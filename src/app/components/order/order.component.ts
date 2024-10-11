import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from 'app/models/order';
import { OrdersService } from 'app/services/orders.service';
import { RemoveButtonComponent } from '../remove-button/remove-button.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, RemoveButtonComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  order = input.required<Order>();

  ordersService = inject(OrdersService);

  onDelete() {
    this.ordersService.deleteOrder(this.order().id);
  }
}
