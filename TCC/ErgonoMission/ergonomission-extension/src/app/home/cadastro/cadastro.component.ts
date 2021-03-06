import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import { formatErrorMessage } from 'src/app/utils/errorHandler';
import { PersonagensService } from 'src/controllers/personagens.service';
import { UsuariosService } from 'src/controllers/usuarios.service';
import CadastroModel from 'src/models/cadastro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent extends DefaultComponent implements OnInit {
  model = new CadastroModel('', '', '', '', '');

  constructor(
    private usuarioService: UsuariosService,
    private popup: PopupService,
    private router: Router,
    private route: ActivatedRoute
  ) { super() }

  ngOnInit(): void {
  }

  submitCadastro() {
    if (this.model.password != this.model.repassword) {
      this.popup.open({ content: PopupDefault, data: { title: "Cadastro", message: "Senhas não coincidem" } });
      return;
    }
    this.subscriptions.push(
      this.usuarioService.createUsuario(this.model).subscribe(
        data => {
          this.popup.open({ content: PopupDefault, data: { message: 'Cadastrado com Sucesso!' } });
          this.router.navigate(['']);
        },
        error => {
          console.log(error);
          this.popup.open({ content: PopupDefault, data: { title: "Erro", message: formatErrorMessage(error) } });
        }
      )
    )
  }

}
