import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'historico-item',
    template: '<dt #item></dt>',
    styleUrls: ['./historico-item.css']
})
export class HistoricoItemComponent implements AfterViewInit {
    @Input() data: any;
    @ViewChild('item') item : ElementRef | undefined;

    constructor() {
    }


    ngAfterViewInit(): void{
        if(this.item){
            this.item.nativeElement.innerHTML = this.data.descricao;
        }
    }
}