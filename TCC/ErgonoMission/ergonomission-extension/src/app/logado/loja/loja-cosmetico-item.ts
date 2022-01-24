import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from "@angular/core";
import { blobToBase64, NoProfilePicture } from "src/app/utils";
import DefaultComponent from "src/app/utils/default-component";
import { CosmeticosService } from "src/controllers/cosmeticos.service";

const template =
    `
<div class="item-wrapper" (click)="retrieveData()">
    <div class="owned" *ngIf="owned == data.id">✔</div>
    <div class="row imagem"><img #image></div>
    <div class="row desc">
        <div class="col-sm-6 nome">{{data.nome}}</div>
        <div class="col-sm-6 coins">
            {{data.preco}}
            <img src="assets/img/coin.png" alt="imagem de uma moeda" />
        </div>
    </div>
    
</div>
`

@Component({
    selector: 'loja-item',
    styleUrls: ['./loja.component.css', '../logado.component.css'],
    template: template
})
export default class LojaItemComponent extends DefaultComponent implements AfterViewInit {
    @Input() data: any;
    @Input() owned: boolean = false;

    @Output() retrieve = new EventEmitter();

    @ViewChild('image') DOMimg: ElementRef<any> | undefined;


    constructor(private cosmetico: CosmeticosService) {
        super()

    }
    ngAfterViewInit(): void {
        this.subscriptions.push(
            this.cosmetico.readImageCosmetico(this.data.id).subscribe(
                data => {
                    blobToBase64(data, (result: string) => {
                        if (this.DOMimg)
                            this.DOMimg.nativeElement.src = result;
                        this.data.imagem = result;
                    });
                },
                error => {
                    if (this.DOMimg)
                        this.DOMimg.nativeElement.src = NoProfilePicture;
                    this.data.imagem = NoProfilePicture;

                }
            ))
    }

    retrieveData() {
        this.retrieve.emit({
            index: this.data.index,
            imagem: this.data.imagem
        });
    }

}