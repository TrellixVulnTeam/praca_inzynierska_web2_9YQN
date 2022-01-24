import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{

  isLogged: boolean = false;

  constructor(
    private auth: AuthService,
    private route: Router
      ){}  
  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.isLogged = this.auth.isLoggedIn();
    if(this.isLogged){
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }

  
  
}
