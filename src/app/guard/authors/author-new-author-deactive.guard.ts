import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewAuthorComponent } from 'src/app/views/authors/new-author/new-author/new-author.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorNewAuthorDeactiveGuard implements CanDeactivate<NewAuthorComponent> {
  canDeactivate(
    component: NewAuthorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
     // if (component.authorForm.dirty && component.discardModalFlag) {
     //   component.openDiscardChangesModal();
      //  return this.discardSubject.asObservable().first();
      //}
    
      return true;
  }
  
}
