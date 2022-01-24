import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageUpdateGuard implements CanActivate {

  constructor(
    private permissionsService: PermissionService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var isAllowed = this.permissionsService.isPermited('Language.Update');
    if(isAllowed){
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
  
}
