import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

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
export class AuthorService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private settings: SettingsService) { }

    getAllAuthors(): Observable<ResponderModel>{
      const apiUrl = this.settings.getApiUrl + '/api/Author/GetAllAuthors';

      return this.httpClient
        .get<ResponderModel>(apiUrl)
        .pipe(map(responder =>{
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    getAllAuthorsToApprove(): Observable<ResponderModel>{
      const apiUrl = this.settings.getApiUrl + '/api/Author/GetAuthorsToApprove';

      return this.httpClient
        .get<ResponderModel>(apiUrl)
        .pipe(map(responder =>{
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    getAuthorByName(name: string): Observable<ResponderModel>{
      const apiUrl = this.settings.getApiUrl + '/api/author/FindAuthorsByName?name=' + name;

      return this.httpClient
        .get<ResponderModel>(apiUrl)
        .pipe(map(responder =>{
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    getAuthorById(ids: string): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/GetById/' + ids;

      return this.httpClient
        .get<ResponderModel>(apiUrl, {withCredentials: true})
        .pipe(map(responder =>{
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    createAuthor(author: AuthorModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/CreateAuthor';

      return this.httpClient
        .post<AuthorModel>(apiUrl, {author}, httpOptions)
        .pipe(map(responder => {
          return responder;
        }), catchError(error =>{
          return this.handleError(error);
        }));
    }

    approveAuthor(author: AuthorModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/ApproveAuthor';

      return this.httpClient
        .put<AuthorModel>(apiUrl, author, httpOptions)
        .pipe(map(responder => {
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    updateAuthor(author: AuthorModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/UpdateAuthor';

      return this.httpClient
        .put<AuthorModel>(apiUrl, author, httpOptions)
        .pipe(map(responder => {
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    softDeleteAuthor(authorId: string): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Author/SoftDeleteAuthor?id=' + authorId ;

      return this.httpClient
        .delete<string[]>(apiUrl, httpOptions)
        .pipe(map(responder => {
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          console.log(JSON.stringify(error));
          return this.handleError(error);
        }));
      }

    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(`HttpError: ${JSON.stringify(error)}`);
  
      return throwError(error);
    }
}
