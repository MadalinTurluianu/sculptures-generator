import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sculpture-generator',
  standalone: true,
  imports: [],
  templateUrl: './sculpture-generator.component.html',
  styleUrl: './sculpture-generator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculptureGeneratorComponent {}
