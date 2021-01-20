import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../layout/services/login.service';
import {Component, OnInit} from '@angular/core';

import {UserInfoModel} from '@const/models';
import {MatSnackBar} from '@angular/material/snack-bar';
import {slideFromBottom} from '@const/animations';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
    animations: [slideFromBottom()]
})
export class LoginComponent implements OnInit {
  info = new UserInfoModel();

  constructor(
    private matSnackBar: MatSnackBar,
    private _loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  // For submit log information. Default url for this._loginService.redirectUrl is './admin'
  onSubmit() {
    this._loginService.login(this.info).subscribe((res: UserInfoModel) => {
      this.router.navigateByUrl(this._loginService.redirectUrl).then(() => {
        this.matSnackBar.open('Hello there! ' + res.username, 'Close',{duration: 5_000});
      });
    });
  }
}
