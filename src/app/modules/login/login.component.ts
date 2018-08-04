import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../app-services/login.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';

import {LoginInfoModel} from '../../shared/models/login-info.model';
import {MatDialog} from '@angular/material';
import {DialogDataExampleDialogComponent} from '../../shared/components/alert-dialog/alert-dialog.component';
import {Md5} from 'ts-md5';
import {ResModel} from '../../shared/models/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  info = new LoginInfoModel();

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  openAlertDialog(msg) {
    this.dialog.open(DialogDataExampleDialogComponent, {
      data: {msg: msg},
    });
  }

  // for submit log information
  onSubmit() {
    this.info.password = Md5.hashStr(this.info.password).toString();
    this.loginService.login(this.info).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.loginService.isLoggedIn = true;
        this.loginService.userName = res.data;
        this.openAlertDialog(res.errmsg);
        this.router.navigate([this.loginService.redirectUrl, {}], {relativeTo: this.route}).catch();
      } else {
        this.openAlertDialog(res.errmsg);
      }
    }, error => {
      this.openAlertDialog(error);
    });
  }
}
