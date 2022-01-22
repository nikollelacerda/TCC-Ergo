import { AfterViewInit, Component, OnInit } from '@angular/core';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import { blobToBase64 } from 'src/app/utils';
import { listaTipoAlongamento } from 'src/app/utils/constants';
import DefaultComponent from 'src/app/utils/default-component';
import { AlongamentosService } from 'src/controllers/alongamentos.service';
declare var $: any;


@Component({
  selector: 'app-biblioteca-alongamento',
  templateUrl: './biblioteca-alongamento.component.html',
  styleUrls: ['./biblioteca-alongamento.component.css']
})
export class BibliotecaAlongamentoComponent extends DefaultComponent implements OnInit, AfterViewInit {
  ListaAlongamentos: any = {};
  user: any;


  constructor(
    private alongamentoService: AlongamentosService,
    private popupService: PopupService
  ) { super() }

  ngOnInit(): void {
    this.ListaAlongamentos.olhos = [];
    this.ListaAlongamentos.costas = [];
    this.ListaAlongamentos.pescoco = [];
    this.ListaAlongamentos.punhos = [];

    let sub = this.alongamentoService.listAlongamentos().subscribe(
      data => {
        for (let entry of data) {
          switch (entry.tipo) {
            case listaTipoAlongamento.OLHOS:
              this.ListaAlongamentos.olhos.push({...entry});
              break;
            case listaTipoAlongamento.COSTAS:
              this.ListaAlongamentos.costas.push({...entry});
              break;
            case listaTipoAlongamento.PESCOÇO:
              this.ListaAlongamentos.pescoco.push({...entry});
              break;
            case listaTipoAlongamento.PUNHOS:
              this.ListaAlongamentos.punhos.push({...entry});
              break;
          }          
        }
      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error.statusText } })
      }
    )
    this.subscriptions.push(sub);

    $(document).ready(function () { $("#olhos").click(function () { $("#alongamento-olhos").slideToggle("slow"); }); });
    $(document).ready(function () { $("#pescoco").click(function () { $("#alongamento-pescoco").slideToggle("slow"); }); });
    $(document).ready(function () { $("#costas").click(function () { $("#alongamento-costas").slideToggle("slow"); }); });
    $(document).ready(function () { $("#punho").click(function () { $("#alongamento-punho").slideToggle("slow"); }); });
  }

  ngAfterViewInit(): void {
    for(let category in this.ListaAlongamentos){
      for(let i in this.ListaAlongamentos[category]){
        this.subscriptions.push(
          this.alongamentoService.readImageAlongamento(this.ListaAlongamentos[category][i].id).subscribe(
            data => {
              blobToBase64(data, (result : string) => {
                this.ListaAlongamentos[category][i].imagem = result;
              })
            },
            error => {
              this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error.statusText } })
            }
          )
        )
      }
    }
  }
}