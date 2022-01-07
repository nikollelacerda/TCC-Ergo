import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaAlogamentoComponent } from './biblioteca-alogamento/biblioteca-alogamento.component';
import { ErgonomiaInfoComponent } from './ergonomia-info/ergonomia-info.component';
import { LogadoHomeComponent } from './logado-home/logado-home.component';
import { LojaComponent } from './loja/loja.component';
import { NovoCicloComponent } from './novo-ciclo/novo-ciclo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  {
    path:'',
    component:LogadoHomeComponent,
    children:[
      {
        path:'perfil',
        component:PerfilComponent,
      },
      {
        path:'novo-ciclo',
        component:NovoCicloComponent,
      },
      {
        path:'loja',
        component:LojaComponent,
      },
      {
        path:'biblioteca-alogamento',
        component:BibliotecaAlogamentoComponent,
      },
      {
        path:'ergonomia-info',
        component:ErgonomiaInfoComponent,
      },
      {
        path:'sobre',
        component:SobreComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogadoRoutingModule { }
