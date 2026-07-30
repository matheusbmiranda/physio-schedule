import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PatientFormComponent, PatientFormData } from '../../shared/patient-form/patient-form.component';

@Component({
  selector: 'app-atualizar-cadastro',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule, PatientFormComponent, ReactiveFormsModule],
  templateUrl: './atualizar-cadastro.component.html',
  styleUrl: './atualizar-cadastro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtualizarCadastroComponent {
  readonly searchControl = new FormControl('');
  showPatientForm = false;
  readonly patient: PatientFormData = {
    nomeCompleto: 'Mariana Silva', cpf: '123.456.789-00', telefone: '(11) 99999-9999', email: 'mariana.silva@email.com',
    dataNascimento: new Date(1990, 4, 15), sexo: 'Feminino', convenio: 'Particular', profissao: 'Professora',
    rua: 'Rua das Flores', numero: '245', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', cep: '01001-000',
    observacoes: 'Paciente em acompanhamento fisioterapêutico.'
  };

  constructor(private readonly snackBar: MatSnackBar) {}

  search(): void {
    this.showPatientForm = true;
  }

  save(): void {
    this.snackBar.open('Cadastro atualizado com sucesso!', 'Fechar', { duration: 3000 });
  }
}
