import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  params: new HttpParams(),
} 


@Injectable({
  providedIn: 'root'
})
export class BookAuthorService {

  constructor(
    private httpClient: HttpClient,
    private settings: SettingsService
  ) { }

  getAuthorsIdsByBook(id: string): Observable<ResponderModel | any>{
    const apiUrl = this.settings.getApiUrl + '/api/Book_Author/GetAllAuthorsByBook/' + id;

    return this.httpClient
      .get(apiUrl, httpOptions)
      .pipe(map(respond => {
        return respond;
      }), catchError(error => {
        return this.handleError(error);
      }));
  }

  handleError(error: HttpErrorResponse): Observable<never>{
    return throwError(error);
  }
}
