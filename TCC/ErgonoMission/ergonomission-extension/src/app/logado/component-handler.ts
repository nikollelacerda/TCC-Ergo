import { BibliotecaAlongamentoComponent } from '../logado/biblioteca-alongamento/biblioteca-alongamento.component';
import { ErgonomiaInfoComponent } from '../logado/ergonomia-info/ergonomia-info.component';
import { LojaComponent } from '../logado/loja/loja.component';
import { PerfilComponent } from '../logado/perfil/perfil.component';
import { PomodoroComponent } from '../logado/pomodoro/pomodoro.component';
import { SobreComponent } from '../logado/sobre/sobre.component';
import { HomeComponent } from './home/home.component';

export enum ComponentEnum {
  BibliotecaAlongamento,
  ErgonomiaInfo,
  Home,
  Loja,
  Perfil,
  Pomodoro,
  Sobre,
}

export interface OptionInterface {
  label: string;
  value: ComponentEnum;
  component: any;
  image?: string;
  hidden?: boolean;
}

export const MenuOptions: OptionInterface[] =
  [
    {
      label: 'Perfil de Usuário',
      value: ComponentEnum.Perfil,
      image: 'perfil.png',
      component: PerfilComponent,
    },
    {
      label: 'Pomodoro',
      value: ComponentEnum.Pomodoro,
      image: 'play.png',
      component: PomodoroComponent,
    },
    {
      label: 'Biblioteca de Alongamentos',
      value: ComponentEnum.BibliotecaAlongamento,
      image: 'alongamento.png',
      component: BibliotecaAlongamentoComponent,
    },
    {
      label: 'Loja',
      value: ComponentEnum.Loja,
      image: 'loja.png',
      component: LojaComponent,
    },
    {
      label: 'Informações Sobre Ergonomia',
      value: ComponentEnum.ErgonomiaInfo,
      image: 'trabalhando.png',
      component: ErgonomiaInfoComponent,
    },
    {
      label: 'Sobre',
      value: ComponentEnum.Sobre,
      image: 'sobre.png',
      component: SobreComponent,
    },
    {
      label: 'Home',
      value: ComponentEnum.Home,
      component: HomeComponent,
      hidden: true,
    },
  ];

export const FindOption = (value: ComponentEnum, list: OptionInterface[] = MenuOptions) : OptionInterface | false => {
  for(let option of list){
    if(option.value === value){
      return option;
    }
  }
  return false;
}
