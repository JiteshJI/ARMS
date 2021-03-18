import {  ViewChild, ViewContainerRef, Injectable } from '@angular/core'
import { NotificationService } from '@progress/kendo-angular-notification';


@Injectable({
  providedIn: 'root'
})
export class kendonotificationservice {

  constructor(private notificationService: NotificationService) { }

  public showSuccess(message): void {
    this.notificationService.show({
      content: message,
      hideAfter: 1500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true }
    });
  }
  public showWarning(message): void {
    this.notificationService.show({
      content: message,
      hideAfter: 5000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'warning', icon: true }
    });
  }
  public showInfo(message): void {
    this.notificationService.show({
      content: message,
      hideAfter: 5000,
      position: { horizontal: 'center', vertical: 'top'  },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'info', icon: true }
    });
  }
  public showError(message): void {
    this.notificationService.show({
      content: message,
      hideAfter: 5000,
      position: { horizontal: 'center', vertical: 'top'  },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true }
    });
  }
}
