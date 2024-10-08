import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent {
  id = input<string>();
}
