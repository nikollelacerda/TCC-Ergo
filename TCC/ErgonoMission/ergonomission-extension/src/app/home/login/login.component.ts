import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';
import  LoginModel from 'src/models/login';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import PopupDefault from 'src/app/componentes/popup/default';
import { formatErrorMessage } from 'src/app/utils/errorHandler';

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
    private popupService:PopupService,
    private route:ActivatedRoute
  ) { }

  submitLogin(){
    this.authService.login(this.model).subscribe(
      data => {
        console.log(data)
        this.cookie.set('token', data.auth_token);
        this.router.navigate(['logado']);
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: formatErrorMessage(error) } });
      }
    );
  }

  ngOnInit(): void {
  }

}
