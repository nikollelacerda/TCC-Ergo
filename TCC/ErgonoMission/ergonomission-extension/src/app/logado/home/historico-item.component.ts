import { Component, Input, OnInit } from '@angular/core';

const template=
`
<dt class="status-{{content.status}}" *ngIf="content != undefined" class="text-center">
    {{content.mensagem[0]}} 
    <span class="titulo">{{content.titulo}}</span> 
    {{content.mensagem[1]}} 
    <span class="pontos">{{content.pontos}}</span>
    {{content.mensagem[2]}}
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
            this.content = JSON.parse(this.data.descricao);
        }
    }
}