import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BirthDateMaskDirective } from '../birth-date-mask/birth-date-mask.directive';

export interface PatientFormData {
  bairro: string;
  cidade: string;
  cep: string;
  convenio: string;
  cpf: string;
  dataNascimento: Date | null;
  email: string;
  estado: string;
  nomeCompleto: string;
  numero: string;
  observacoes: string;
  profissao: string;
  rua: string;
  sexo: string;
  telefone: string;
}

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    MatButtonModule,
    BirthDateMaskDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientFormComponent {
  @Input() submitLabel = 'Cadastrar Paciente';
  @Output() save = new EventEmitter<void>();

  readonly sexos = ['Feminino', 'Masculino', 'Outro', 'Prefiro não informar'];
  readonly estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  readonly patientForm = inject(FormBuilder).group({
    nomeCompleto: [''],
    cpf: [''],
    telefone: [''],
    email: [''],
    dataNascimento: [null as Date | null],
    sexo: [''],
    convenio: [''],
    profissao: [''],
    rua: [''],
    numero: [''],
    bairro: [''],
    cidade: [''],
    estado: [''],
    cep: [''],
    observacoes: ['']
  });

  @Input() set patient(data: PatientFormData | null) {
    if (data) {
      this.patientForm.patchValue(data);
    }
  }
}
