import { Component, OnInit } from '@angular/core';
import { STORAGE_FILTRO } from 'src/app/utils/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  private filtroStatus:boolean = false;

  constructor() {
    
  }
  
  ngOnInit(): void {
    chrome.storage.sync.get(STORAGE_FILTRO, 
      (itens)=>{
        if(itens[STORAGE_FILTRO] != undefined){
          this.filtroStatus = itens[STORAGE_FILTRO];
          return;
        }
        chrome.storage.sync.set({[STORAGE_FILTRO]: this.filtroStatus});
    });
  }

  toggleFiltro() {
    this.filtroStatus = !this.filtroStatus;
    chrome.storage.sync.set({[STORAGE_FILTRO]: this.filtroStatus});
  }
}
