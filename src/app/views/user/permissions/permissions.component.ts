import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { UserPermissionModel } from 'src/app/models/user-permissions/user-permission-model';
import { UserModel } from 'src/app/models/users/user-model';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  users: UserModel[] = [];
  currentUser: UserModel = new UserModel;
  permissions: UserPermissionModel[] = [];
  responder: ResponderModel | any;
  userId: string = '';
  form: FormGroup;
  name: FormControl;

  canAuthorApprove: boolean = false;
  canAuthorUpdate: boolean = false;
  canAuthorSoftDelete: boolean = false;

  canBookApprove: boolean = false;
  canBookUpdate: boolean = false;
  canBookSoftDelete: boolean = false;

  canCommentSoftDelete: boolean = false;

  canCategoryWrite: boolean = false;
  canCategoryUpdate: boolean = false;
  canCategorySoftDelete: boolean = false;

  canImageCoverDelete: boolean = false;

  canLanguageWrite: boolean = false;
  canLanguageUpdate: boolean = false;
  canLanguageSoftDelete: boolean = false;

  canPublisherWrite: boolean = false;
  canPublisherUpdate: boolean = false;
  canPublisherSoftDelete: boolean = false;

  canUserDelete: boolean = false;

  canUserPermissionWrite: boolean = false;
  canUserPermissionDelete: boolean = false;

  constructor(
    private permissionService: PermissionService,
    private userService: UserService,
    private toatrs: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.name = new FormControl('');
      this.form = this.formBuilder.group({
        name: this.name
      })
    }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onSubmit(userId: string){
    this.getPerissionForUser(userId);
  } 

  addPermission(userId: string, permissionName: string){
    var newPermission = new UserPermissionModel;
    newPermission.userId = userId;
    newPermission.isBuildIn = true;
    newPermission.permissionName = permissionName;

    return this.permissionService
      .addPermission(newPermission)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toatrs.show('Nadano uprawnienie');
        }
        this.router.navigate(['/permissions']);
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.router.navigate(['/permissions']);
      })   
  }

  revokePermission(userId: string, permissionName: string){
    return this.permissionService
      .deletePermission(userId, permissionName)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toatrs.show('Cofnięto uprawnienie');
        }
        this.router.navigate(['/permissions']);
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.router.navigate(['/permissions']);
      }) 
  }

  getAllUsers(){
    return this.userService
      .getAllUsers()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.users = this.responder.object;
        } else {
          this.toatrs.show('Błąd połączenia z bazą danych');
        }
      }, error =>{
        this.toatrs.show('Błąd połączenia z bazą danych');
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getPerissionForUser(id: string){
    return this.permissionService
      .getPermissions(id)
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object != null){
          this.permissions = this.responder.object;
          this.checkPermissions();
        } else {
          this.toatrs.show(this.responder.message);
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  checkPermissions(){
    for(var i = 0; i < this.permissions.length; i++){
      if(this.permissions[i].permissionName == 'Author.Approve'){
        this.canAuthorApprove = true;
      }
      if(this.permissions[i].permissionName == 'Author.Update'){
        this.canAuthorUpdate = true;
      }
      if(this.permissions[i].permissionName == 'Author.SoftDelete'){
        this.canAuthorSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'Book.Approve'){
        this.canBookApprove = true;
      }
      if(this.permissions[i].permissionName == 'Book.Update'){
        this.canBookUpdate = true;
      }
      if(this.permissions[i].permissionName == 'Book.SoftDelete'){
        this.canBookSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'Category.Write'){
        this.canCategoryWrite = true;
      }
      if(this.permissions[i].permissionName == 'Category.Update'){
        this.canCategoryUpdate = true;
      }
      if(this.permissions[i].permissionName == 'Category.SoftDelete'){
        this.canCategorySoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'Comment.SoftDelete'){
        this.canCommentSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'ImageCover.Delete'){
        this.canImageCoverDelete = true;
      }

      if(this.permissions[i].permissionName == 'Language.Write'){
        this.canLanguageWrite = true;
      }
      if(this.permissions[i].permissionName == 'Language.Update'){
        this.canLanguageUpdate = true;
      }
      if(this.permissions[i].permissionName == 'Language.SoftDelete'){
        this.canLanguageSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'Publisher.Write'){
        this.canPublisherWrite = true;
      }
      if(this.permissions[i].permissionName == 'Publisher.Update'){
        this.canPublisherUpdate = true;
      }
      if(this.permissions[i].permissionName == 'Publisher.SoftDelete'){
        this.canPublisherSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'User.Delete'){
        this.canPublisherSoftDelete = true;
      }

      if(this.permissions[i].permissionName == 'UserPermission.Write'){
        this.canUserPermissionWrite = true;
      }
      if(this.permissions[i].permissionName == 'UserPermission.Delete'){
        this.canUserPermissionDelete = true;
      }

    }
  }
}



