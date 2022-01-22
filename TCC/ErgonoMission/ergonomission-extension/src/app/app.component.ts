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
    const to = this.cookie.get('redirect');
    if (to) {
      this.router.navigate([to]);
      this.cookie.delete('redirect');
    } else {
      this.router.navigate(['home']);
    }
  }
  title = 'ergonomission';
}
