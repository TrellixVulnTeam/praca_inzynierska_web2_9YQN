import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { TokenReposnderModel } from 'src/app/models/token-reposnders/token-reponder-model';
import { LoginModel } from 'src/app/models/users/login-model';
import { UserModel } from 'src/app/models/users/user-model';
import { SettingsService } from '../settings/settings.service';


const USER_NAME = 'user-name';
const USER_ID = 'user-id';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }),
  params: new HttpParams(),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = '';
  userId: string | null = '';
  
  constructor(
    private httpClient: HttpClient,
    private settingsService: SettingsService,
    private toastr: ToastrService) { }

  postLogin(user: LoginModel): Observable<TokenReposnderModel | any>
  {
      const apiUrl = this.settingsService.getApiUrl + `/api/Authorization/Login`;

      return this.httpClient
          .post(apiUrl, user)
          .pipe(map(tokenResposne =>{
              return tokenResposne;
          }),
          catchError(error => {
            this.toastr.error(JSON.stringify(error.error));
            return this.handleError(error);
          }));
  }

  postRegister(user: UserModel): Observable<any>{
    const apiUrl = this.settingsService.getApiUrl + '/api/Authorization/Register';

    return this.httpClient
      .post(apiUrl, user)
      .pipe(map(response => {
        return response;
      }),
      catchError(error => {
        return this.handleError(error);
      }));
}

  getMe(): Observable<ResponderModel | any>{
    const apiUrl = this.settingsService.getApiUrl + '/api/User/GetMeWithPassword';

    return this.httpClient
      .get<UserModel>(apiUrl, {withCredentials: true})
      .pipe(map(response => {
        return response;
      }),
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getUserNameById(id: string): Observable<ResponderModel | any> {
    const apiUrl = this.settingsService.getApiUrl + '/api/User/GetUserNameById/' + id;

    return this.httpClient
      .get<ResponderModel>(apiUrl)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error =>{
        return this.handleError(error);
      }));
  }

  getUserById(id: string): Observable<ResponderModel>{
    const apiUrl = this.settingsService.getApiUrl + '/api/User/GetUserById?id=' + id;

    return this.httpClient
      .get<ResponderModel>(apiUrl)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error =>{
        return this.handleError(error);
      }))
  }

  updateUser(user: UserModel){
    const apiUrl = this.settingsService.getApiUrl + '/api/User/UpdateUser';

    return this.httpClient
      .post<UserModel>(apiUrl, user)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error =>{
        return this.handleError(error);
      }))
  }

  saveUserName(userName: string){
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, userName);
    this.userName = this.getUserName();
  }

  getUserName(): string{
    var name = window.sessionStorage.getItem(USER_NAME);
    if(name != null){
      return name;
    }
    return '';
  }

  saveUserId(userId: string){
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
  }

  getUserId(): string {
    this.userId = window.sessionStorage.getItem(USER_ID);
    if(this.userId != null){
      return this.userId;
    }
    return '';
  }

  getAllUsers(): Observable<ResponderModel | any>{
    const apiUrl = this.settingsService.getApiUrl + '/api/User/GetAllUsers';

    return this.httpClient
      .get<ResponderModel>(apiUrl, httpOptions)
      .pipe(map(respond => {
        return respond;
      }), catchError(error =>{
        return this.handleError(error);
      }))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`HttpError: ${JSON.stringify(error)}`);

    return throwError(error);
  }
}
