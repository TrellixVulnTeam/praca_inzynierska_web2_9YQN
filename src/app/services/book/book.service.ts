import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
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

   getAllBooks(): Observable<ResponderModel | any>{
     const apiUrl = this.setting.getApiUrl + '/api/Book/GetAllBooks';

     return this.httpClient
      .get(apiUrl, httpOptions)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error => {
        return this.handleError(error);
      }));
   }

   getBooksToApprove(): Observable<ResponderModel | any>{
    const apiUrl = this.setting.getApiUrl + '/api/Book/GetBooksToAprrove';

     return this.httpClient
      .get(apiUrl, httpOptions)
      .pipe(map(response =>{
        return response;
      }), catchError(error =>{
        return this.handleError(error);
      }));
   }
  
   getBookById(id: string): Observable<ResponderModel | any>{
     const apiUrl = this.setting.getApiUrl + '/api/Book/GetBookById/' + id;

     return this.httpClient
      .get(apiUrl, httpOptions)
      .pipe(map(response =>{
        return response;
      }),
      catchError(error =>{
        return this.handleError(error);
      }))
   }

   private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`HttpError: ${JSON.stringify(error)}`);

    return throwError(error);
  }

}
