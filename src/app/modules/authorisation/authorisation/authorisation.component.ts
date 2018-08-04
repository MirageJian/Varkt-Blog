import { AuthorisationService } from '../authorisation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogDataExampleDialogComponent } from '../../../shared/components/alert-dialog/alert-dialog.component';
import { PoyoungAuth } from './PoyoungAuth';
import { ResModel } from '../../../shared/models';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss']
})
export class AuthorisationComponent implements OnInit {
  authForm: FormGroup;
  animal: string;
  name2: string;

  constructor(private authorisation: AuthorisationService, public dialog: MatDialog) { }

  openAlertDialog(msg) {
    this.dialog.open(DialogDataExampleDialogComponent, {
      data: { msg: msg },
    });
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      'code': new FormControl('', [Validators.required]),
      'phone' : new FormControl('', [Validators.required]),
      'name' : new FormControl('', [Validators.required]),
      'imei' : new FormControl('', [Validators.required]),
    });
  }
  get code() { return this.authForm.get('code'); }
  get phone() { return this.authForm.get('phone'); }
  get name() { return this.authForm.get('name'); }
  get imei() { return this.authForm.get('imei'); }

  getErrorMessage(type) {
    if (type === 'code') {
      return this.code.hasError('required') ? 'You must enter the code of invitation.' : '';
    } else if (type === 'phone') {
      return this.phone.hasError('required') ? 'You must enter the phone number.' : '';
    } else if (type === 'name') {
      return this.name.hasError('required') ? 'You must enter your title.' : '';
    } else {
      return this.imei.hasError('required') ? 'You must enter the code of your device.' : '';
    }
  }
  onSubmit() {
    const info = new PoyoungAuth();
    info.code = this.code.value;
    info.phone = this.phone.value;
    info.name = this.name.value;
    info.imei = this.imei.value;
    this.authorisation.postPoyoungAuthInfo(info).subscribe(
      (data: ResModel) => {
        this.openAlertDialog(data.errmsg);
        // alert(data.errmsg);
      }, error => {
        this.openAlertDialog(error);
      });
    // const obj = JSON.parse(result);
    // if(result.errcode)
  }
}


