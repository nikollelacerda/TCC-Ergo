import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';
import  LoginModel from 'src/models/login';

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
    private cookie:CookieService
  ) { }

  submitLogin(){
    this.authService.login(this.model).subscribe(
      data => {
        this.cookie.set('token', data.token);
        this.router.navigate(['logado']);
      },
      error => {
        alert('Credenciais Inválidas');
      }
    );
  }

  ngOnInit(): void {
  }

}
