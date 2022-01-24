import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const TOKEN_TYPE = 'token-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  check: string | any = '';
  loginStatus: boolean = false;

  constructor(  ) { }

  signOut(): void {
    window.sessionStorage.clear();
    this.loginStatus = false;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.loginStatus = true;
  }

  public getToken(): string {
    var token = window.sessionStorage.getItem(TOKEN_KEY);
    if(token != null){
      if(token.length > 1){
        return token
      }
    }
    return '';
  }

  public saveType(type: string): void {
    window.sessionStorage.removeItem(TOKEN_TYPE);
    window.sessionStorage.setItem(TOKEN_TYPE, type);
  }

  public getType(): string | null {
    return window.sessionStorage.getItem(TOKEN_TYPE);
  }

  public isLoggedIn(): boolean{
    this.check = this.getToken()
    if(this.check.length > 2){
      return true;
    } else {
      return false;
    }
  }
}
