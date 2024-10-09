import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sculpture } from 'app/models/sculpture';

@Component({
  selector: 'app-sculpture',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sculpture.component.html',
  styleUrl: './sculpture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculptureComponent {
  sculpture = input.required<Sculpture>();
}
