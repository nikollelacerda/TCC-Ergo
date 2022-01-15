import { AfterViewInit, Component, OnInit } from '@angular/core';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import { AlongamentosService } from 'src/controllers/alongamentos.service';

@Component({
  selector: 'app-biblioteca-alongamento',
  templateUrl: './biblioteca-alongamento.component.html',
  styleUrls: ['./biblioteca-alongamento.component.css']
})
export class BibliotecaAlongamentoComponent extends DefaultComponent implements OnInit {
  ListaAlongamentos: AlongamentoItem[] = [];
  data: any;


  constructor(
    private alongamentoService: AlongamentosService,
    private popupService: PopupService
  ) { super() }


  ngOnInit(): void {
    this.alongamentoService.listAlongamentos().subscribe(
      data => {
        this.ListaAlongamentos = data;
        console.log(this.ListaAlongamentos)
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error } })
      }
    )
  }
}

interface AlongamentoItem {
  imagem: string,
  descricao: string,
}