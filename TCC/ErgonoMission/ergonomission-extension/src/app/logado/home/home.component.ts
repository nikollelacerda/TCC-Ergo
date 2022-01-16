import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import { MENSAGEM_SEM_HISTORICO } from 'src/app/utils/constants';
import { HistoricosService } from 'src/controllers/historicos.service';
import PopupDefault from 'src/app/componentes/popup/default';

@Component({
  selector: 'logado-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() user: any;
  historicoList: any[] = [];
  MENSAGEM_SEM_HISTORICO = MENSAGEM_SEM_HISTORICO;

  constructor(
    private historico: HistoricosService,
    private popupService: PopupService
  ) { }


  ngOnInit(): void {
    this.historico.fetchHistoricoByUser(this.user.uid, this.user.token).subscribe(
      data => {
        this.historicoList = data.data;

      },
      error => {
        this.popupService.open({ content: PopupDefault, data: { title: "Erro", message: error } });
      }
    );
  }



}
