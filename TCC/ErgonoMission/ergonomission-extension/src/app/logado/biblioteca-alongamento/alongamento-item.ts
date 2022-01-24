import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { blobToBase64 } from "src/app/utils";
import DefaultComponent from "src/app/utils/default-component";
import { AlongamentosService } from "src/controllers/alongamentos.service";

const template = 
`
<div class="item-wrapper">
    <tr>
        <th><div class="imagem" style="background-image: url('{{image}}')"></div></th>
    </tr>
    <tr>
        <th>{{data.descricao}}</th>
    </tr>
</div>
`

@Component({
    selector: 'alongamento-item',
    styleUrls: ['./biblioteca-alongamento.component.css'],
    template: template
})
export default class AlongamentoItemComponent extends DefaultComponent implements AfterViewInit {
    @Input() data: any;
    image: any;

    constructor(private alongService: AlongamentosService) {
        super()

    }
    ngAfterViewInit(): void {
        this.subscriptions.push(
            this.alongService.readImageAlongamento(this.data.id).subscribe(
            data => {
                blobToBase64(data, (result : string)=>{
                    this.image = result;
                });
            },
            error => {
                console.log('error', error)
            }
        ))
    }



}