import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { UserPermissionModel } from 'src/app/models/user-permissions/user-permission-model';
import { __await } from 'tslib';
import { SettingsService } from '../settings/settings.service';

const PERMISSION_LIST = 'PERMISSIONS_LIST';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  userId = '';
  permissionList = [''];
  permissionLongString: string = '';
  permissionName = '';
  //isPermitted = false;
  hasPermissions: boolean = false;
  respond = new UserPermissionModel;

  constructor(
    private httpClient: HttpClient,
    private seetings: SettingsService) { }

  getPermissions(id: string): Observable<ResponderModel>{
    const apiUrl = this.seetings.getApiUrl + '/api/UserPermission/GetAllPermissionsForUser?userId=' + id;
     return this.httpClient
      .get<ResponderModel>(apiUrl)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error =>{
        return this.handleError(error);
      }));
  }

  savePermissionsList(permissions: string[]){
    window.sessionStorage.removeItem(PERMISSION_LIST);
    window.sessionStorage.setItem(PERMISSION_LIST, JSON.stringify(permissions));
    window.sessionStorage.setItem(PERMISSION_LIST, JSON.stringify(permissions));
    this.hasPermissions = true;
  }

  getPermissionList(): string{
    var longString = window.sessionStorage.getItem(PERMISSION_LIST);
    if(longString != null){
      return longString;
    } else {
      return '';
    }
  }

  resetPermissions(){
      this.hasPermissions = false;
  }

  isPermited(permissionNameToCheck: string): boolean{
    this.permissionLongString = this.getPermissionList();
    this.permissionList = JSON.parse(this.permissionLongString);
    for(let i = 0; i < this.permissionList.length; i++){
      if(this.permissionList[i] == permissionNameToCheck){
        return true;
      }
    }

    return false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`HttpError: ${JSON.stringify(error)}`);

    return throwError(error);
  }
}
