import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogadoHomeComponent } from './logado-home/logado-home.component';

const routes: Routes = [
  {
    path:'',
    component:LogadoHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogadoRoutingModule { }
