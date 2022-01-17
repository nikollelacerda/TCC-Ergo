import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent extends DefaultComponent implements OnInit {
  user: any;

  constructor(
    private auth:AutenticacaoService, 
    private cookie:CookieService,
    private router:Router,
    private popupService: PopupService
  ) { super() }

  ngOnInit(): void {
  }

  logout(){
    const token = this.cookie.get('token');
    this.subscriptions.push(this.auth.logout(token).subscribe(
      data => {
        this.cookie.delete('token');
        this.router.navigate(['home']);
      },
      error => {
        this.popupService.open({content: PopupDefault, data: {title:'Erro', message: error.statusText}})
      }
    ));
  }
}
