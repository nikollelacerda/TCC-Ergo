import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private cookie: CookieService, private router: Router) { }
  ngOnInit(): void {
    const to = chrome.storage.sync.get("redirect", (itens) => {
      const to = itens['redirect']
      if (to) {
        this.router.navigate([to]);
        chrome.storage.sync.set({ "redirect": null });
      } else {
        this.router.navigate(['home']);
      }
    })

  }
  title = 'ergonomission';
}
