import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from 'app/models/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  order = input.required<Order>();
}
