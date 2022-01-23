import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import { blobToBase64, NoProfilePicture } from 'src/app/utils';
import DefaultComponent from 'src/app/utils/default-component';
import { formatErrorMessage } from 'src/app/utils/errorHandler';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';
import { PersonagensService } from 'src/controllers/personagens.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent extends DefaultComponent implements OnInit {
  user: any;

  constructor(
    private personagem: PersonagensService,
    private auth: AutenticacaoService,
    private cookie: CookieService,
    private router: Router,
    private popupService: PopupService
  ) { super() }

  ngOnInit(): void {
    this.subscriptions.push(
      this.personagem.readImagePersonagem(this.user.uid).subscribe(
        data => {
          blobToBase64(data, (blob: string) => {
            this.user.image = blob;
          })
        },
        error => {
          console.log(error);
          this.user.image = NoProfilePicture;
        }
      )

    )
    if (!this.user.personagem) {
      this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: "Personagem Inexistente" } })
    }

  }

  logout() {
    const token = this.cookie.get('token');
    this.subscriptions.push(this.auth.logout(token).subscribe(
      data => {
        this.cookie.deleteAll('/')
        this.router.navigate(['home']);
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: formatErrorMessage(error) } })
      }
    ));
  }
}
