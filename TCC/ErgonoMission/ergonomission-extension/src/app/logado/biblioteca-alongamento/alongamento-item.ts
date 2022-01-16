import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import DefaultComponent from "src/app/utils/default-component";
import { AlongamentosService } from "src/controllers/alongamentos.service";


@Component({
    selector: 'alongamento-item',
    template: `<dt><img #image>{{data.descricao}}</dt>`,
    styleUrls: ['./biblioteca-alongamento.component.css']
})
export default class AlongamentoItemComponent extends DefaultComponent implements AfterViewInit {
    @Input() data: any;

    @ViewChild('image') DOMimg: ElementRef<any> | undefined;


    constructor(private alongService: AlongamentosService) {
        super()

    }
    ngAfterViewInit(): void {
        this.subscriptions.push(this.alongService.readImageAlongamento(this.data.id).subscribe(
            data => {
                let reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                    if(this.DOMimg)
                        this.DOMimg.nativeElement.src = reader.result;
                }
            },
            error => {
                console.log('error', error)
            }
        ))
    }



}