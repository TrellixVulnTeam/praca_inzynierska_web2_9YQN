import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';
import { UserService } from '../user/user.service';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }),
  params: new HttpParams(),
};

const USER_ID = 'user-id';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  userId: any = '';

  constructor(
    private httpClient: HttpClient,
    private setting: SettingsService,
    private user: UserService) {
   }

   getMyListOfId(){
    const apiUrl = this.setting.getApiUrl + '/api/Book_User/GetBooksByUser'

    this.userId = this.user.getUserId();
    if(this.userId != null){
      return this.httpClient
      .get(apiUrl, this.userId)
      .pipe(map(responder =>{
        return responder;
    }),
    catchError(error => {
      return error;
    }));
    }
   }

   getMyBookList(bookIds: string[]){
     const apiUrl = this.setting.getApiUrl + '/api/Book/GetBooksByList';

     let params = new HttpParams;
     //this.params = bookIds.join(', ');
     return this.httpClient
      .get(apiUrl, {params: params })
      .pipe(map(responder => {
        return responder;
      }),
      catchError(error =>{
        return this.handleError(error);
      }));
   }

   private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`HttpError: ${JSON.stringify(error)}`);

    return throwError(error);
  }

}
