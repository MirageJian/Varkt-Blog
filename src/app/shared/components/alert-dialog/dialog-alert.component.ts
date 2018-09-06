import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: 'dialog-alert.component.html',
})

export class DialogAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg:string}) {}
}

