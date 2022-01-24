import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private authApiUrl = environment.authApiUrl;

  constructor() { }

  get getApiUrl(): string {
    return this.authApiUrl;
  }
}