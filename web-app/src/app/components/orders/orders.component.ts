import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SculptureComponent } from '../sculpture/sculpture.component';
import { OrderComponent } from '../order/order.component';
import { OrdersService } from 'app/services/orders.service';
import { RouterLink } from '@angular/router';
import { ListComponent } from '../shared/list/list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SculptureComponent, OrderComponent, RouterLink, ListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  ordersService = inject(OrdersService);
}
