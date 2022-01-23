import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuard, AuthGuardLogado } from './auth-guard.service';
import { BibliotecaAlongamentoComponent } from './logado/biblioteca-alongamento/biblioteca-alongamento.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    canActivate: [AuthGuardLogado],
    loadChildren: () => import('./home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'logado',
    canActivate: [AuthGuard],
    loadChildren: () => import('./logado/logado.module').then((module) => module.LogadoModule),
  },
  {
    path: 'alongamentos',
    component: BibliotecaAlongamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthGuardLogado]
})
export class AppRoutingModule { }
