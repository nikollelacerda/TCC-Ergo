import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { BibliotecaAlogamentoComponent } from './biblioteca-alogamento/biblioteca-alogamento.component';
import { LojaComponent } from './loja/loja.component';
import { ErgonomiaInfoComponent } from './ergonomia-info/ergonomia-info.component';
import { SobreComponent } from './sobre/sobre.component';
import { LogadoComponent } from './logado.component';


@NgModule({
  declarations: [
    BibliotecaAlogamentoComponent,
    ErgonomiaInfoComponent,
    HomeComponent,
    LojaComponent,
    LogadoComponent,
    PerfilComponent,
    PomodoroComponent,
    SobreComponent,
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ],
  exports:[LogadoComponent]
})
export class LogadoModule { }
