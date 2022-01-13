import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logado',
  templateUrl: './logado.component.html',
  styleUrls: ['./logado.component.css']
})
export class LogadoComponent implements OnInit {

  MenuOptions = [
    {
      label: 'Perfil de Usuário',
      value: 'perfil',
      img:'perfil.png'
    },
    {
      label: 'Pomodoro',
      value: 'pomodoro',
      img:'play.png'
    },
    {
      label: 'Biblioteca de Alongamentos',
      value: 'biblioteca-alongamento',
      img:'alongamento.png'
    },
    {
      label: 'Loja',
      value: 'loja',
      img:'loja.png'
    },
    {
      label: 'Informações Sobre Ergonomia',
      value: 'ergonomia-info',
      img:'trabalhando.png'
    },
    {
      label: 'Sobre',
      value: 'sobre',
      img:'sobre.png'
    },
  ]
  defaultOption = 'home';
  currentOption = this.defaultOption;

  constructor() { }

  ngOnInit(): void {
  }

  changeOption(option : string){
    this.currentOption = option;
  }
}
