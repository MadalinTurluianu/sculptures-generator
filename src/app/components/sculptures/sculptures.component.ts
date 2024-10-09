import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SculptureComponent } from '../sculpture/sculpture.component';
import { SculpturesService } from 'app/services/sculptures.service';
import { AddButtonComponent } from '../add-button/add-button.component';

@Component({
  selector: 'app-sculptures',
  standalone: true,
  imports: [RouterLink, SculptureComponent, AddButtonComponent],
  templateUrl: './sculptures.component.html',
  styleUrl: './sculptures.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent {
  sculpturesService = inject(SculpturesService);
}
