import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Key } from 'app/models/key';
import { RemoveButtonComponent } from '../remove-button/remove-button.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [RouterLink, MatCardModule, RemoveButtonComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  link = input.required<string | string[]>();
  name = input.required<string>();
  key = input.required<Key>();

  delete = output<Key>();

  onDelete() {
    this.delete.emit(this.key());
  }
}
