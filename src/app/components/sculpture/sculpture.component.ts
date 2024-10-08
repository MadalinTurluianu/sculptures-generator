import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sculpture',
  standalone: true,
  imports: [],
  templateUrl: './sculpture.component.html',
  styleUrl: './sculpture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculptureComponent {}
