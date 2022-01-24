import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  params = new HttpParams();

  constructor(
    private httpClient: HttpClient,
    private settings: SettingsService,
    private toastr: ToastrService) { }

    getAllCategories(): Observable<ResponderModel | any>{
        const apiUrl = this.settings.getApiUrl + '/api/Category/GetAllCategories';

        return this.httpClient
          .get(apiUrl, {withCredentials: true})
          .pipe(map(response => {
            return response;
          }),
          catchError(error => {
            this.toastr.error(error.error);
            return this.handleError(error);
          }));
    }

    getCategoryById(id: string): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/category/GetCategoryById?id=' + id;

      return this.httpClient
        .get(apiUrl)
        .pipe(map(responder => {
          return responder;
        }),
        catchError(error => {
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    getCategoryByName(name: string): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/category/FindByName';

      this.params.delete('')
                .append('name', name);

      return this.httpClient
        .get(apiUrl, {params: this.params})
        .pipe(map(responder =>{
          return responder;
        }),
        catchError(error => {
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    createCategory(category: CategoryModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Category/CreateCategory';

      return this.httpClient
        .post(apiUrl, category)
        .pipe(map(responder =>{
          return responder;
        }),
        catchError(error => {
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    updateCategory(category: CategoryModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Category/UpdateCategory';

      return this.httpClient
        .put<CategoryModel>(apiUrl, category, httpOptions)
        .pipe(map(responder =>{
          return responder;
        }),
        catchError(error =>{
          this.toastr.error(error.error);
          return this.handleError(error);
        }));
    }

    softDeleteCategory(id: string): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Category/SoftDeleteCategory?name=' + id;

      return this.httpClient
        .delete(apiUrl, httpOptions)
        .pipe(map(responder =>{
          return responder;
        }),
        catchError(error => {
          this.toastr.error(error.error);
          return this.handleError(error);
        }))
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(`HttpError: ${JSON.stringify(error)}`);
  
      return throwError(error);
    }

}
