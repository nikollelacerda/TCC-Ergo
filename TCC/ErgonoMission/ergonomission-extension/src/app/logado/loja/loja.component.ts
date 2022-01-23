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

  selected: any;
  isSelected:boolean = false;
  ListaCosmeticos: any[] = [];
  user: any;
  cols: number = 2;
  
  @ViewChild('fotoPerfil') DOMperfil : any;
  @ViewChild('display') DOMDisplay : any;

  constructor(
    private cosmeticos: CosmeticosService,
    private popup:PopupService,
    private personagem:PersonagensService
  ) { super() }

  ngOnInit(): void {
    this.subscriptions.push(
      this.cosmeticos.listCosmeticos().subscribe(
        data=>{
          let i = 0;
          for(let item of data){
            item.owned = item.id == this.user.personagem.cosmeticos;
            item.index = i++;
            this.ListaCosmeticos.push(item);
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
      this.personagem.readImagePersonagem(this.user.uid).subscribe(
        data=>{
          blobToBase64(data, (blob:string)=>{
            this.user.imagem = blob
          });
        }
      )
    )
  }

  displayData(data : any){
    this.selected = {...this.ListaCosmeticos[data.index]}
    this.selected.imagem =  data.imagem;
    this.isSelected = true;
  }

  comprar(){
    this.subscriptions.push(
      this.cosmeticos.comprarCosmetico(this.selected.id, this.user.uid, this.user.token).subscribe(
        data=>{
          this.user.pontos = data.data.pontos;
          this.user.personagem.cosmeticos = data.data.cosmetico;

          this.subscriptions.push(
            this.cosmeticos.readImageCosmetico(data.data.cosmetico).subscribe(
              data=>{
                blobToBase64(data, (blob:string)=>{
                  this.user.imagem = blob;
                })
              }
            )
          )

          this.popup.open({content: PopupDefault, data: {title: "Sucesso", message: `Compra realizada!`}})
        },
        error=>{
          if(error.status === 412 ){
            this.popup.open({content: PopupDefault, data: {title: "Pontos Insuficientes", message: `Você não tem pontos suficientes para comprar...`}})
          } else {
            this.popup.open({content: PopupDefault, data: {title: "Erro", message: formatErrorMessage(error)}})
          }
        }
      )
    )
  }
}
