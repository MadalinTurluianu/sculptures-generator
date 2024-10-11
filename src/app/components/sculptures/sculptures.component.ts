import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SculptureComponent } from '../sculpture/sculpture.component';
import { SculpturesService } from 'app/services/sculptures.service';
import { ListComponent } from '../shared/list/list.component';

@Component({
  selector: 'app-sculptures',
  standalone: true,
  imports: [ListComponent, SculptureComponent],
  templateUrl: './sculptures.component.html',
  styleUrl: './sculptures.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculpturesComponent {
  sculpturesService = inject(SculpturesService);
}
