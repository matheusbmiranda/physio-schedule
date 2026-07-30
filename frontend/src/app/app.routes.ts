import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AtualizarCadastroComponent } from './pages/atualizar-cadastro/atualizar-cadastro.component';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: InicioComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'cadastro-paciente', component: CadastroPacienteComponent },
      { path: 'atualizar-cadastro', component: AtualizarCadastroComponent }
    ]
  }
];
