import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ConfiguredSculpture } from 'app/models/configured-sculpture.model';
import { RemoveButtonComponent } from '../shared/remove-button/remove-button.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RemoveButtonComponent, MatIcon],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {
  totalPrice = input.required<number>();
  totalWeight = input.required<number>();
  configuredSculptures = input.required<ConfiguredSculpture[]>();

  delete = output<number>();

  onDelete(index: number): void {
    this.delete.emit(index);
  }
}
