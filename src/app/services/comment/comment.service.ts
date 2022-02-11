import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommentModel } from 'src/app/models/comments/comment.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private settings: SettingsService) { }

  getCommentByBook(id: string): Observable<any>{
   const apiUrl = this.settings.getApiUrl + '/api/Comment/GetAllCommentsForBook?bookId=' + id;
    
  return this.httpClient
    .get(apiUrl, httpOptions)
    .pipe(map(responder =>{
      return responder;
    }),
    catchError(error => {
      return this.handleError(error);
    }))
  }

  getCommentByUser(id: string): Observable<any>{
    const apiUrl = this.settings.getApiUrl + '/api/Comment/GetAllCommentsByUser?bookId=' + id;
 
   return this.httpClient
     .get(apiUrl, httpOptions)
     .pipe(map(responder =>{
       return responder;
     }),
     catchError(error => {
       return this.handleError(error);
     }))
   }

   createComment(comment: CommentModel): Observable<any>{
    const apiUrl = this.settings.getApiUrl + '/api/Comment/CreateComment';
 
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     }
   return this.httpClient
     .post(apiUrl, comment, httpOptions)
     .pipe(map(responder =>{
       return responder;
     }),
     catchError(error => {
       return this.handleError(error);
     }))
   }

   updateComment(comment: CommentModel): Observable<any>{
    const apiUrl = this.settings.getApiUrl + '/api/Comment/UpdateComment';
 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  return this.httpClient
    .put(apiUrl, comment, httpOptions)
    .pipe(map(responder =>{
      return responder;
    }),
    catchError(error => {
      return this.handleError(error);
    }))
   }

   deleteComment(id: string): Observable<ResponderModel | any>{
    const apiUrl = this.settings.getApiUrl + '/api/Comment/SoftDeleteComment/' + id;

    return this.httpClient
      .delete(apiUrl, httpOptions)
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
