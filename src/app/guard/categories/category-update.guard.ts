import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryUpdateGuard implements CanActivate {
  //isAllowed: boolean = false;

  constructor(
    private permissionsService: PermissionService,
    private router: Router,
    private toastr: ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {   
    var isAllowed = this.permissionsService.isPermited('Category.Update');
    if(isAllowed){
      return true;
    } else {
      this.toastr.error('nie posiadasz uprawnień do edycji');
      this.router.navigate(['/main']);
      return false;
    } 
  }
  
}
