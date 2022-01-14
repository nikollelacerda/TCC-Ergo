import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosService } from 'src/controllers/usuarios.service';
import { ComponentEnum, FindOption, MenuOptions } from './component-handler';

@Component({
  selector: 'app-logado',
  templateUrl: './logado.component.html',
  styleUrls: ['./logado.component.css'],
})
export class LogadoComponent implements OnInit, AfterViewInit {
  MenuOptions = MenuOptions;
  defaultOption = ComponentEnum.Home;
  currentOption = this.defaultOption;

  @ViewChild('componenteAqui', { read: ViewContainerRef }) DOMView: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private usuarioService:UsuariosService, 
    private cookie:CookieService
  ) {}

  
  ngOnInit(): void {
    const token = this.cookie.get('token');
  }

  ngAfterViewInit(): void {
    this.changeOption(this.defaultOption);
  }

  changeOption(value: ComponentEnum) {

    const option = FindOption(value);

    if (option === false) {
      return;
    }

    this.currentOption = option.value;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(option.component);
    this.DOMView.clear();

    const componentRef = this.DOMView.createComponent(componentFactory);
    //componentRef.instance.data = adItem.data;
    return option;

  }
}
