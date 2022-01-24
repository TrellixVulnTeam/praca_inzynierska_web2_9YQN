import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommentModel } from 'src/app/models/comments/comment.model';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private settings: SettingsService) { }

  getCommentByBook(id: string): Observable<any>{
   const apiUrl = this.settings.getApiUrl + '/api/Comment/GetAllCommentsForBook?bookId=' + id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
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
 
     const httpOptions = {
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
     }
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

   deleteComment(){

   }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`HttpError: ${JSON.stringify(error)}`);

    return throwError(error);
  }
}
