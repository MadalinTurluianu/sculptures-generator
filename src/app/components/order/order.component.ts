import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from 'app/models/order.model';
import { OrdersService } from 'app/services/orders.service';
import { MatCardModule } from '@angular/material/card';
import { ListItemComponent } from '../shared/list-item/list-item.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, MatCardModule, ListItemComponent],
  templateUrl: './order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  order = input.required<Order>();

  ordersService = inject(OrdersService);

  onDelete() {
    this.ordersService.delete(this.order().id);
  }
}
