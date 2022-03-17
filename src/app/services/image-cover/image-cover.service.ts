import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { SettingsService } from '../settings/settings.service';

const httpOptions = {
  headers: new HttpHeaders({'Accept': 'image/jpeg'})
};

@Injectable({
  providedIn: 'root'
})
export class ImageCoverService {

  constructor(
    private setting: SettingsService,
    private httpClient: HttpClient,
    ) { }

    public getImages(id: string): Observable<string | any>{
      const apiUrl = this.setting.getApiUrl + '/api/ImageCover/GetImageCoverById/' + id;

      return this.httpClient.get(apiUrl, {responseType: 'blob' })
      .pipe(map(respond =>{
        return respond;
      }), catchError(error =>{
        return this.handleError(error);
      }));
    }

    public uploadImage(file: File): Observable<ResponderModel | any>{
      const apiUrl = this.setting.getApiUrl + '/api/ImageCover/CreateImageCover';
      const formData = new FormData(); 
      formData.append("file", file, file.name);

      return this.httpClient
        .post(apiUrl, formData, httpOptions)
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


