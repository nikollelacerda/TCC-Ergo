import { AfterViewInit, Component, OnInit } from '@angular/core';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import DefaultComponent from 'src/app/utils/default-component';
import { AlongamentosService } from 'src/controllers/alongamentos.service';
import * as $ from 'node_modules/jquery';

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
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error.statusText } })
      }
    )
  }
  $(document).ready(function(){ $("#olhos").click(function(){ $("#alongamento-olhos").slideToggle("slow"); }); });
	$(document).ready(function(){ $("#pescoco").click(function(){ $("#alongamento-pescoco").slideToggle("slow"); }); });
	$(document).ready(function(){ $("#costas").click(function(){ $("#alongamento-costas").slideToggle("slow"); }); });
	$(document).ready(function(){ $("#punho").click(function(){ $("#alongamento-punho").slideToggle("slow"); }); });

}

interface AlongamentoItem {
  imagem: string,
  descricao: string,
}