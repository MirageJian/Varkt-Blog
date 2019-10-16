import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordModel = {
    oldPassword: '',
    newPassword: '',
    confirmedPassword: ''
  };
  constructor() { }

  ngOnInit() {
  }

  changePassword() {

  }

}
