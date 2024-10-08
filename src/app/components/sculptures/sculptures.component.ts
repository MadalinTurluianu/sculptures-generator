import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sculptures',
  standalone: true,
  imports: [],
  templateUrl: './sculptures.component.html',
  styleUrl: './sculptures.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent {}
