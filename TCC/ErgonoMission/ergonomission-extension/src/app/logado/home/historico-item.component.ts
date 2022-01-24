import { Component, Input, OnInit } from '@angular/core';

const template=
`
<dt *ngIf="content != undefined">
    {{content.mensagem[0]}}<b>{{content.title}}</b>
</dt>
`

@Component({
    selector: 'historico-item',
    styleUrls: ['./historico-item.css'],
    template: template
})
export class HistoricoItemComponent implements OnInit {
    @Input() data: any;
    content: any = undefined;
    /*Estrutura:
        mensagem (array[3]),
        titulo,
        pontos,
    */

    constructor() {
    }


    ngOnInit(){
        if(this.data){
            this.content = JSON.parse(this.data);
        }
    }
}