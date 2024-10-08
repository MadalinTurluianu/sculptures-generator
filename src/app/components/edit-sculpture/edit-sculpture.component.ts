import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-sculpture',
  standalone: true,
  imports: [],
  templateUrl: './edit-sculpture.component.html',
  styleUrl: './edit-sculpture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSculptureComponent {}
