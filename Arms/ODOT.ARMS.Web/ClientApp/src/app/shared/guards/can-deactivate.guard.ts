import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentToDeactivate } from '../models/component-to-deactivate';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ComponentToDeactivate> {

  constructor(private dialogService: DialogService) {
  }

  canDeactivate(component: ComponentToDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isComponentDirty()) {
      return this.getConfirmation();
    }

    return true;
  }

  public getConfirmation(): Observable<boolean> {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content: 'Are you sure you want to navigate away without saving your changes?',
      actionsLayout: 'normal',
      actions: [
        { text: 'No', width: 20},
        { text: 'Yes', primary: true }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });

    return dialog.result.pipe(
      map(result => {
        if (result instanceof DialogCloseResult) {
          return false;
        } else {
          return result.text === 'Yes' ? true : false;
        }
      })
    );
  }
}
