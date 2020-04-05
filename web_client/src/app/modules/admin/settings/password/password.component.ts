import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../settings.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {ResModel} from "@shared/models";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  password: FormGroup;
  passwordModel = {
    oldPassword: '',
    newPassword: '',
    confirmedPassword: ''
  };
  isDisableSubmit = false;
  constructor(
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.password = new FormGroup({
      oldPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmedPassword: new FormControl(),
      // confirmedPassword: new FormControl('', (control: FormControl): {[key: string]: any} | null => {
      //   const controlValid = this.password.get('newPassword').value === control.value;
      //   return controlValid ? null : {notMatch: true};
      // }),
    });
    this.password.get('confirmedPassword').setValidators((control: FormControl): {[key: string]: any} | null => {
      const controlValid = this.password.get('newPassword').value === control.value;
      return controlValid ? null : {notMatch: true};
    })
  }

  changePassword(password) {
    this.isDisableSubmit = true;
    this.settingsService.changePassword(password).subscribe((data: ResModel) => {
      this.isDisableSubmit = false;
      this.snackBar.open(data.errmsg, 'OK', {duration: 5_000});
    }, () =>this.isDisableSubmit = false);
  }



}
