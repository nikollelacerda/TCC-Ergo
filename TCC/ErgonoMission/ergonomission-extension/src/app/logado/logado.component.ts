import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/controllers/usuarios.service';
import { ComponentEnum, FindOption, MenuOptions } from './component-handler';

@Component({
  selector: 'app-logado',
  templateUrl: './logado.component.html',
  styleUrls: ['./logado.component.css'],
})
export class LogadoComponent implements OnInit {
  MenuOptions = MenuOptions;
  defaultOption = ComponentEnum.Home;
  currentOption = this.defaultOption;
  activeComponent: any;
  userData: any;

  @ViewChild('componenteAqui', { read: ViewContainerRef }) DOMView: ViewContainerRef | undefined;

  constructor(
    private usuarioService:UsuariosService, 
    private cookie:CookieService
  ) {}

  
  ngOnInit(): void {
    const token = this.cookie.get('token');
    this.usuarioService.readUsuario(token).subscribe(
      data => {
        this.userData = data;
        this.changeOption(this.defaultOption);
      },
      error => {
        //TODO: Handle dos Erros
        console.log(error);
      }
    );
  }

  changeOption(value: ComponentEnum) {

    if(this.DOMView === undefined){
      return;
    }

    const option = FindOption(value);

    if (option === false) {
      return;
    }

    this.currentOption = option.value;
    this.DOMView.clear();

    this.activeComponent = this.DOMView.createComponent<any>(option.component);
    this.activeComponent.instance.user = this.userData;
  }
}
