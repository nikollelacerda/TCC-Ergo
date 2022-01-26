import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import { blobToBase64, NoProfilePicture } from 'src/app/utils';
import DefaultComponent from 'src/app/utils/default-component';
import { formatErrorMessage } from 'src/app/utils/errorHandler';
import { AutenticacaoService } from 'src/controllers/autenticacao.service';
import { PersonagensService } from 'src/controllers/personagens.service';
import { UsuariosService } from 'src/controllers/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent extends DefaultComponent implements OnInit {

  user: any;
  token: string;

  constructor(
    private personagem: PersonagensService,
    private usuario: UsuariosService,
    private auth: AutenticacaoService,
    private cookie: CookieService,
    private router: Router,
    private popupService: PopupService
  ) {
    super();
    this.token = this.cookie.get('token');

  }

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

  alterar(field: string, value: string, isPersonagem: boolean = false) {
    let erro;
    if (!value) {
      erro = `Campo ${field} inválido!`
    }
    else if (value.length < 4) {
      erro = `Campo ${field} não pode ser menor que 4 caracteres.`
    }
    if (erro) {
      this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: erro } });
      return;
    }
    const data = {
      [field]: value,
      uid: this.user.uid
    }
    if(isPersonagem){
      data['usuario'] = data.uid
      delete data.uid
      console.log(data)
      this.subscriptions.push(
        this.personagem.updatePersonagem(data, this.token).subscribe(
          data => {
            console.log(data)
            this.user.personagem[field] = value;
            this.popupService.open({ content: PopupDefault, data: { title: 'Sucesso ao atualizar', message: "Dados Atualizados!" } });
          },
          error => {
            this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: formatErrorMessage(error) } });
  
          }
        )
      );
      return;
    }
    this.subscriptions.push(
      this.usuario.updateUsuario(data, this.token).subscribe(
        data => {
          this.user[field] = value;
          this.popupService.open({ content: PopupDefault, data: { title: 'Sucesso ao atualizar', message: "Dados Atualizados!" } });
        },
        error => {
          this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: formatErrorMessage(error) } });

        }
      )
    );
  }

  logout() {
    this.subscriptions.push(this.auth.logout(this.token).subscribe(
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