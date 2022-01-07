import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { LogadoHomeComponent } from './logado-home/logado-home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NovoCicloComponent } from './novo-ciclo/novo-ciclo.component';
import { BibliotecaAlogamentoComponent } from './biblioteca-alogamento/biblioteca-alogamento.component';
import { LojaComponent } from './loja/loja.component';
import { ErgonomiaInfoComponent } from './ergonomia-info/ergonomia-info.component';
import { SobreComponent } from './sobre/sobre.component';


@NgModule({
  declarations: [
    LogadoHomeComponent,
    PerfilComponent,
    NovoCicloComponent,
    BibliotecaAlogamentoComponent,
    LojaComponent,
    ErgonomiaInfoComponent,
    SobreComponent
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ]
})
export class LogadoModule { }
