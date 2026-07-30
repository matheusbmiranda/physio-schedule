import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PatientFormComponent } from '../../shared/patient-form/patient-form.component';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [MatCardModule, PatientFormComponent],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroPacienteComponent {
}
