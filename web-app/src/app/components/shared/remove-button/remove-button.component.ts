import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-remove-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveButtonComponent {
  delete = output<void>();

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit();
  }
}
