import { Component, Input, OnInit } from '@angular/core';

const template=
`
<dt *ngIf="content != undefined" class="text-center">
    {{content.mensagem[0]}} 
    <b>{{content.titulo}}</b> 
    {{content.mensagem[1]}} 
    {{content.pontos}} 
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
            console.log(this.data);
            this.content = JSON.parse(this.data.descricao);
        }
    }
}