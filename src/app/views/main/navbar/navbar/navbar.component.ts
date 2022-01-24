import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(
    public auth: AuthService,
    public user: UserService,
    public permissions: PermissionService
    ) {  
      //this.LoginStatus$ = this.auth.IsLogged();
     }  

  logout(){
    this.permissions.resetPermissions();
    this.auth.signOut();
  }
    
}
