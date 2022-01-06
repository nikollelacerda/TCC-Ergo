import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home',
  },
  {
    path: 'home',
    loadChildren:()=>import('./home/home.module').then((m)=>m.HomeModule),
  },
  {
    path:'logado',
    loadChildren:()=>import('./logado/logado.module').then((m)=>m.LogadoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
