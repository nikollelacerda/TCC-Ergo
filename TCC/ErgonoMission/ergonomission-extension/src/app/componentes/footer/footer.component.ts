import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ativarFiltro() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {

      tab[0].id &&
        chrome.scripting.executeScript({
          target: { tabId: tab[0].id },
          func: () => {
            document.body.style.filter = "sepia(0.45) brightness(0.95) contrast(0.9)";
          },
        });
    });



  }
}
