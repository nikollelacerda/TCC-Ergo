import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { blobToBase64 } from "src/app/utils";
import DefaultComponent from "src/app/utils/default-component";
import { AlongamentosService } from "src/controllers/alongamentos.service";

const template = 
`
<tr>
    <th><img #image></th>
</tr>
<tr>
    <th>{{data.descricao}}</th>
</tr>
`

@Component({
    selector: 'alongamento-item',
    styleUrls: ['./biblioteca-alongamento.component.css'],
    template: template
})
export default class AlongamentoItemComponent extends DefaultComponent implements AfterViewInit {
    @Input() data: any;

    @ViewChild('image') DOMimg: ElementRef<any> | undefined;


    constructor(private alongService: AlongamentosService) {
        super()

    }
    ngAfterViewInit(): void {
        this.subscriptions.push(
            this.alongService.readImageAlongamento(this.data.id).subscribe(
            data => {
                blobToBase64(data, (result : string)=>{
                    if(this.DOMimg)
                        this.DOMimg.nativeElement.src = result;
                });
            },
            error => {
                console.log('error', error)
            }
        ))
    }



}