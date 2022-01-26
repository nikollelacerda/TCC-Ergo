import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { BibliotecaAlongamentoComponent } from './biblioteca-alongamento/biblioteca-alongamento.component';
import { LojaComponent } from './loja/loja.component';
import { ErgonomiaInfoComponent } from './ergonomia-info/ergonomia-info.component';
import { SobreComponent } from './sobre/sobre.component';
import { LogadoComponent } from './logado.component';
import { HistoricoItemComponent } from './home/historico-item.component';
import AlongamentoItemComponent from './biblioteca-alongamento/alongamento-item';
import LojaItemComponent from './loja/loja-cosmetico-item';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'logado', component: LogadoComponent }
];

@NgModule({
  declarations: [
    AlongamentoItemComponent,
    BibliotecaAlongamentoComponent,
    ErgonomiaInfoComponent,
    HomeComponent,
    LogadoComponent,
    LojaComponent,
    LojaItemComponent,
    PerfilComponent,
    PomodoroComponent,
    SobreComponent,
    HistoricoItemComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    LogadoRoutingModule,
    FormsModule,
  ],
  exports:[LogadoComponent, RouterModule],
})
export class LogadoModule { }
