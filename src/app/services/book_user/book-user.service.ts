import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BookUserModel } from 'src/app/models/book_users/book_user.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookUserService {

  constructor(
    private settings: SettingsService,
    private httpClient: HttpClient) { }

    public GetListOfBooksIdByUser(userId: string): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/Book_User/GetBooksByUser/' + userId;

      return this.httpClient
        .get(apiUrl, httpOptions)
        .pipe(map(respond =>{
          return respond;
        }), catchError(error =>{
          return this.handleError(error);
        }))
    }

    public AddBookToUserList(book_user: BookUserModel): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/Book_User/CreateBook_User';

      return this.httpClient
        .post<BookUserModel>(apiUrl, book_user, httpOptions)
        .pipe(map(respond =>{
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

