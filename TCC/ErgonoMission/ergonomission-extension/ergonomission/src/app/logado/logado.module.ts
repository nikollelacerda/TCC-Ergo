import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoRoutingModule } from './logado-routing.module';
import { LogadoHomeComponent } from './logado-home/logado-home.component';


@NgModule({
  declarations: [
    LogadoHomeComponent
  ],
  imports: [
    CommonModule,
    LogadoRoutingModule
  ]
})
export class LogadoModule { }
