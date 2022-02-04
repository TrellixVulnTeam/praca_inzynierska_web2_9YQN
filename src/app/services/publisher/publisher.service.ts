import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(
    private settings: SettingsService,
    private httpClient: HttpClient,
    private toastr: ToastrService) { }

    getPublishers(): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/Publisher/GetAllPublishers';

      return this.httpClient
        .get(apiUrl, httpOptions)
        .pipe(map(response => {
          return response;
        }),
        catchError(error =>{
          return this.handlerError(error);
        }));
    }

    getPublisherById(id: string): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/Publisher/GetPublisherById/' + id;

      return this.httpClient
        .get(apiUrl, httpOptions)
        .pipe(map(response =>{
          return response;
        }),
        catchError(error =>{
          return this.handlerError(error);
        }));
    }

    newPublisher(publisher: PublisherModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Publisher/CreatePublisher';

      return this.httpClient
        .post(apiUrl, publisher, httpOptions)
        .pipe(map(response =>{
          return response;
        }),
        catchError(error =>{
          return this.handlerError(error);
        }));
    }

    editPublisher(publisher: PublisherModel): Observable<any>{
      const apiUrl = this.settings.getApiUrl + '/api/Publisher/UpdatePublisher';

      return this.httpClient
        .put(apiUrl, publisher, httpOptions)
        .pipe(map(response =>{
          return response;
        }),
        catchError(error =>{
          return this.handlerError(error);
        }));
    }

    deletePublisher(id: string): Observable<ResponderModel | any>{
      const apiUrl = this.settings.getApiUrl + '/api/Publisher/SoftDeletePublisher/' + id;

      return this.httpClient
        .delete(apiUrl, httpOptions)
        .pipe(map(respond =>{
          return respond;
        }),
        catchError(error =>{
          this.toastr.show(error.error);
          return this.handlerError(error);
        }));
    }

    handlerError(error: HttpErrorResponse): Observable<never>{
      console.log(`HttpError ${JSON.stringify(error)}`);

      return throwError(error);
    }    
  }
