import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'button[app-add-button]',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {}
