import { AuthorisationService } from '../authorisation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogAlertComponent } from '../../../shared/components/alert-dialog/dialog-alert.component';
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

  constructor(private authorisation: AuthorisationService, public dialog: MatDialog) {
    document.title="破样信息注册"
  }

  openAlertDialog(msg) {
    this.dialog.open(DialogAlertComponent, {
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
    this.authorisation.getCookie().subscribe();
  }
  get code() { return this.authForm.get('code'); }
  get phone() { return this.authForm.get('phone'); }
  get name() { return this.authForm.get('name'); }
  get imei() { return this.authForm.get('imei'); }

  getErrorMessage(type) {
    if (type === 'code') {
      return this.code.hasError('required') ? '请填入邀请码.' : '';
    } else if (type === 'phone') {
      return this.phone.hasError('required') ? '请填入上网手机号.' : '';
    } else if (type === 'name') {
      return this.name.hasError('required') ? '请填入姓名或其他可以识别名字.' : '';
    } else {
      return this.imei.hasError('required') ? '请填入设备ID.' : '';
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


