import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionWriteGuard implements CanActivate {

  constructor(
    private permissionsService: PermissionService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var isAllowed = this.permissionsService.isPermited('UserPermission.Write');
    if(isAllowed){
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
  
}
