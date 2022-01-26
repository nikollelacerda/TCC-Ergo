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
import * as bg from "src/background";

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

  alterarSenha(senha: any, resenha: any, cusenha: any) {
    if (senha.value && resenha.value && cusenha.value) {
      if (senha.value != resenha.value) {
        this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: "Senhas não coincidem" } })
        return;
      }
      this.subscriptions.push(
        this.usuario.updateSenha({ new_password: senha.value, re_new_password: resenha.value, current_password: cusenha.value }, this.token).subscribe(
          data => {
            this.popupService.open({ content: PopupDefault, data: { title: 'Sucesso!', message: "Senha modificada com sucesso." } });
          },
          error => {
            this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: formatErrorMessage(error) } });

          }
        )
      )
    } else {
      this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: "Preencha todos os campos de senha" } })
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
    if (isPersonagem) {
      data['usuario'] = data.uid
      delete data.uid
      this.subscriptions.push(
        this.personagem.updatePersonagem(data, this.token).subscribe(
          data => {
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
    if (field == 'password') {
      this.subscriptions.push(
        this.usuario.updateSenha(data, this.token).subscribe(
          data => {
            this.user[field] = value;
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
        chrome.alarms.clear(bg.ALARM_POMODORO);
        chrome.alarms.clear(bg.ALARM_POMODORO_BREAK);
        chrome.notifications.clear(bg.NOTIFICATION_POMODORO);
        chrome.notifications.clear(bg.NOTIFICATION_POMODORO_END);
        chrome.notifications.clear(bg.NOTIFICATION_POMODORO_BREAK);
        chrome.notifications.clear(bg.NOTIFICATION_POMODORO_BREAK_END);
        this.cookie.deleteAll('/')
        this.router.navigate(['home']);
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: 'Erro', message: formatErrorMessage(error) } })
      }
    ));
  }
}