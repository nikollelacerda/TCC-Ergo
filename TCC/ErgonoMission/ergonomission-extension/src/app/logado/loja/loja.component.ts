import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import PopupDefault from 'src/app/componentes/popup/default';
import { PopupService } from 'src/app/componentes/popup/popup.service';
import { blobToBase64 } from 'src/app/utils';
import DefaultComponent from 'src/app/utils/default-component';
import { formatErrorMessage } from 'src/app/utils/errorHandler';
import { CosmeticosService } from 'src/controllers/cosmeticos.service';
import { PersonagensService } from 'src/controllers/personagens.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css', '../logado.component.css']
})
export class LojaComponent extends DefaultComponent implements OnInit, AfterViewInit{

  ListaCosmeticos: any[] = [];
  user: any;
  cols: number = 2;
  
  @ViewChild('fotoPerfil') DOMperfil : any;

  constructor(
    private cosmeticos: CosmeticosService,
    private popup:PopupService,
    private personagem:PersonagensService
  ) { super() }

  ngOnInit(): void {
    this.subscriptions.push(
      this.cosmeticos.listCosmeticos().subscribe(
        data=>{
          for(let i = 0; i < data.length; i++){
            if(i % this.cols == 0){
              this.ListaCosmeticos.push([]);
            }
            data[i].owned = data[i].id == this.user.personagem.cosmeticos;
            this.ListaCosmeticos[Math.floor(i/2)][i%2] = data[i];
          }
        },
        error=>{
          this.popup.open({content: PopupDefault, data: {title: "Erro", message: formatErrorMessage(error)}})
        }
      )
    );
  }

  ngAfterViewInit(){
    this.subscriptions.push(
      this.personagem.readImagePersonagem(this.user.personagem.id).subscribe(
        data=>{
          blobToBase64(data, (blob:string)=>{
            this.DOMperfil.nativeElement.src = blob
          });
        }
      )
    )
  }

}
