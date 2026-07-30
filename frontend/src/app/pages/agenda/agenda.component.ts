import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaComponent {
}
