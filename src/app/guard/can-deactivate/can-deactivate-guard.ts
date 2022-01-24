import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ICanComponentDeactivate } from "./ican-component-deactivate";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {
  constructor(
    public dialog: MatDialog,
  ) {
  }
  canDeactivate(
    component: ICanComponentDeactivate,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}