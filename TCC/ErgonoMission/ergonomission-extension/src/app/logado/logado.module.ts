import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { LogadoHomeComponent } from './logado-home/logado-home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { BibliotecaAlogamentoComponent } from './biblioteca-alogamento/biblioteca-alogamento.component';
import { LojaComponent } from './loja/loja.component';
import { ErgonomiaInfoComponent } from './ergonomia-info/ergonomia-info.component';
import { SobreComponent } from './sobre/sobre.component';


@NgModule({
  declarations: [
    LogadoHomeComponent,
    PerfilComponent,
    PomodoroComponent,
    BibliotecaAlogamentoComponent,
    LojaComponent,
    ErgonomiaInfoComponent,
    SobreComponent
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ],
  exports:[LogadoHomeComponent]
})
export class LogadoModule { }
