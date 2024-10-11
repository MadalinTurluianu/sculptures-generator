import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sculpture } from 'app/models/sculpture';
import { SculpturesService } from 'app/services/sculptures.service';
import { ListItemComponent } from '../shared/list-item/list-item.component';

@Component({
  selector: 'app-sculpture',
  standalone: true,
  imports: [RouterLink, ListItemComponent],
  templateUrl: './sculpture.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SculptureComponent {
  sculpture = input.required<Sculpture>();

  sculpturesService = inject(SculpturesService);

  onDelete() {
    this.sculpturesService.deleteSculpture(this.sculpture().id);
  }
}
