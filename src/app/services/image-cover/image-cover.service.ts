import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

    getImages(id: string): Observable<string | any>{
      const apiUrl = this.setting.getApiUrl + '/api/ImageCover/GetImageCoverById/' + id;

      return this.httpClient.get(apiUrl, {responseType: 'blob' })
      .pipe(map(respond =>{
        return respond;
      }), catchError(error =>{
        return this.handleError(error);
      }));
      }


    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(`HttpError: ${JSON.stringify(error)}`);
  
      return throwError(error);
    }
}
function switchMap(arg0: (response: any) => Observable<string>): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

