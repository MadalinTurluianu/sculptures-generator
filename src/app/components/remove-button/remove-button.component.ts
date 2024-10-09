import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'button[app-remove-button]',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveButtonComponent {}
