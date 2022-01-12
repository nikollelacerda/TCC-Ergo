import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/controllers/usuarios.service';
import CadastroModel from 'src/models/cadastro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
  model = new CadastroModel('','','','','');

  constructor(
    private usuarioService:UsuariosService, 
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  submitCadastro(){
    console.log(this.model);
    this.usuarioService.createUsuario(this.model).subscribe(
      data => {
        this.router.navigate(['']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
