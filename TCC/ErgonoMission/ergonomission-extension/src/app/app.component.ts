import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    chrome.storage.sync.get("redirect", (itens) => {
      const to = itens['redirect']
      if (to) {
        this.router.navigate([to]);
        chrome.storage.sync.set({ "redirect": null });
      }
    })
  }
}
