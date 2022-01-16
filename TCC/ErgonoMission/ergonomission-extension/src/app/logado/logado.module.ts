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



@NgModule({
  declarations: [
    BibliotecaAlongamentoComponent,
    ErgonomiaInfoComponent,
    HomeComponent,
    LojaComponent,
    LogadoComponent,
    PerfilComponent,
    PomodoroComponent,
    SobreComponent,
    HistoricoItemComponent,
    AlongamentoItemComponent,
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ],
  exports:[LogadoComponent],
})
export class LogadoModule { }
