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
  passwordFormGroup: FormGroup;
  isDisableSubmit = false;
  constructor(
    private _settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.passwordFormGroup = new FormGroup({
      oldPassword: new FormControl(),
      newPassword: new FormControl(),
      confirmedPassword: new FormControl(),
      // confirmedPassword: new FormControl('', (control: FormControl): {[key: string]: any} | null => {
      //   const controlValid = this.password.get('newPassword').value === control.value;
      //   return controlValid ? null : {notMatch: true};
      // }),
    });
    this.passwordFormGroup.get('confirmedPassword').setValidators((control: FormControl): {[key: string]: any} | null => {
      const controlValid = this.passwordFormGroup.get('newPassword').value === control.value;
      return controlValid ? null : {notMatch: true};
    })
  }

  changePassword() {
    this.isDisableSubmit = true;
    this._settingsService.changePassword(this.passwordFormGroup).subscribe((data: ResModel) => {
      this.isDisableSubmit = false;
      // If successfully and Click OK, it will reset.
      this.snackBar.open(data.message, 'OK, reset the form').afterDismissed().subscribe(() => this.passwordFormGroup.reset());
    }, () =>this.isDisableSubmit = false);
  }
}
