import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuardLogado implements CanActivate {
  constructor(
    private router: Router,
    private cookie: CookieService
    ) { }

    canActivate() {
        this.cookie.check('token') && 
          this.router.navigate(['logado']);
          
        return true;
    }

}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookie: CookieService
    ) { }

    canActivate() {
        this.cookie.check('token') || 
          this.router.navigate(['home']);
          
        return true;
    }

}