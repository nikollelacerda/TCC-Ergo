import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';
import  LoginModel from 'src/models/login';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import PopupDefault from 'src/app/componentes/popup/default';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new LoginModel('','');

  constructor(
    private authService:AutenticacaoService, 
    private router:Router,
    private cookie:CookieService,
    private popupService:PopupService
  ) { }

  submitLogin(){
    this.authService.login(this.model).subscribe(
      data => {
        this.cookie.set('token', data.auth_token);
        this.router.navigate(['logado']);
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error.statusText } });
      }
    );
  }

  ngOnInit(): void {
  }

}
