import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../app-services/login.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';

import {LoginInfoModel} from '../../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Md5} from 'ts-md5';
import {ResModel} from '../../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  info = new LoginInfoModel();

  constructor(
    private matSnackBar: MatSnackBar,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  // for submit log information
  onSubmit() {
    this.info.password = Md5.hashStr(this.info.password).toString();
    this.loginService.login(this.info).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.loginService.isLoggedIn = true;
        this.loginService.userName = res.data;
        this.matSnackBar.open(res.errmsg, 'Close',{duration: 5_000});
        this.router.navigate([this.loginService.redirectUrl, {}], {relativeTo: this.route}).catch();
      } else {
        this.matSnackBar.open(res.errmsg, 'Close', {duration: 5_000});

      }
    }, error => {
      this.matSnackBar.open(error, 'Close', {duration: 5_000});
    });
  }
}
