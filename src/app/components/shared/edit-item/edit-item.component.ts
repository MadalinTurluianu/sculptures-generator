import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditItemComponent {
  prevLink = input<string | string[] | undefined>();
  nextLink = input<string | string[] | undefined>();
}
