import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dialog-alert',
  templateUrl: 'dialog-alert.component.html',
})

export class DialogAlertComponent {
  alertType: AlertType;
  AlertType = AlertType;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string | HttpErrorResponse) {
    if (data instanceof HttpErrorResponse) this.alertType = AlertType.httpError;
    else this.alertType = AlertType.message
  }
}

enum AlertType {
  message, httpError
}

