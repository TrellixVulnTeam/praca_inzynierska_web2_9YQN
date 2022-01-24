import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorApproveGuard implements CanActivate {

  constructor(
    private permissionsService: PermissionService,
    private rout: Router,
    private toastr: ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    var isAllowed = this.permissionsService.isPermited('Author.Approve');
    if(isAllowed){
      return true;
    } else {
      this.toastr.error('nie posiadasz uprawnień');
      this.rout.navigate(['/main']);
      return false;
    }
  }
  
}
