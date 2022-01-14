import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogadoComponent } from './logado.component';

const routes: Routes = [
  {
    path:'',
    component:LogadoComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogadoRoutingModule { }
