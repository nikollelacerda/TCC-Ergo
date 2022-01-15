import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'historico-item',
    styleUrls: ['./home.component.css'],
    template: '<dt>{{data.descricao}}</dt>',
})
export class HistoricoItemComponent implements OnInit {
    @Input() data: any;

    constructor() { }

    ngOnInit(): void {
    }
}