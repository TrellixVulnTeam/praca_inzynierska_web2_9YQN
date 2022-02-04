import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookAuthorService } from '../book_author/book-author.service';
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
  ids: string[] = [];
  responder: ResponderModel | any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private settings: SettingsService,
    private bookAuthorService: BookAuthorService,) { }

    public getAllAuthors(): Observable<ResponderModel>{
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

    public getAllAuthorsToApprove(): Observable<ResponderModel>{
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

    public getAuthorByName(name: string): Observable<ResponderModel>{
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

    public getAuthorById(id: string): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/GetById/' + id;

      return this.httpClient
        .get<ResponderModel>(apiUrl, {withCredentials: true})
        .pipe(map(responder =>{
          return responder;
        }), catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    public getAuthorsIds(bookId: string){
        return this.bookAuthorService
          .getAuthorsIdsByBook(bookId)
          .pipe(first())
          .subscribe(respond =>{
            this.responder = respond;
            if(this.responder.object != null){
              this.ids = this.responder.object;
            }
          },error =>{
            console.log(`HttpError: ${JSON.stringify(error)}`);
          })
    }

    public getAuthorByIds(bookId: string): Observable<ResponderModel | any>{
      this.getAuthorsIds(bookId);

      const apiUrl = this.settings + '/api/Author/GetAuthorsByIds/';
      httpOptions.params.append('ids', this.ids.join(','));

      return this.httpClient
        .get(apiUrl, httpOptions)
        .pipe(map(respond =>{
          return respond;
        }), catchError(error =>{
          return this.handleError(error);
        }));
    }

    public createAuthor(author: AuthorModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/author/CreateAuthor';

      return this.httpClient
        .post<AuthorModel>(apiUrl, {author}, httpOptions)
        .pipe(map(responder => {
          return responder;
        }), catchError(error =>{
          return this.handleError(error);
        }));
    }

    public approveAuthor(author: AuthorModel): Observable<any>{
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

    public updateAuthor(author: AuthorModel): Observable<any>{
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

    public softDeleteAuthor(authorId: string): Observable<any>{
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
