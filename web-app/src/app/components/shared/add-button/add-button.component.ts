import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  add = output<void>();

  onAdd(event: Event): void {
    event.stopPropagation();
    this.add.emit();
  }
}
