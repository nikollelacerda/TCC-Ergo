import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { LogadoComponent } from './logado.component';


@NgModule({
  declarations: [
    LogadoComponent
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ]
})
export class LogadoModule { }
