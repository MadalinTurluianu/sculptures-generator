import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatCardModule],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditItemComponent {
  title = input.required<string>();
  prevLink = input<string | string[] | undefined>();
  nextLink = input<string | string[] | undefined>();
}
