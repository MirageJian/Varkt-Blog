import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: 'alert-dialog.component.html',
})

export class DialogDataExampleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

