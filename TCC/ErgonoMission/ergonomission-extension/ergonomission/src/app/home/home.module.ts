import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { MensagemModule } from '../componentes/mensagem/mensagem.module';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    FormsModule,
    MensagemModule,
  ],
  exports:[HomeComponent],
  providers: [CookieService]
})
export class HomeModule { }
