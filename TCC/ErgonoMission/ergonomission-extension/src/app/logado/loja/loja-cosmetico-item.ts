import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { blobToBase64, NoProfilePicture } from "src/app/utils";
import DefaultComponent from "src/app/utils/default-component";
import { CosmeticosService } from "src/controllers/cosmeticos.service";

const template =
    `
<div class="wrapper">
    <div class="owned" *ngIf="data.owned == true">✔</div>
    <div class="row imagem"><img #image></div>
    <div class="row desc">
        <div class="col-sm-6 nome">{{data.nome}}</div>
        <div class="col-sm-6 coins">
            <img src="assets/img/coin.png" alt="imagem de uma moeda" />
            {{data.preco}}
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
                    });
                },
                error => {
                    if (this.DOMimg)
                        this.DOMimg.nativeElement.src = NoProfilePicture;
            }
            ))
    }



}