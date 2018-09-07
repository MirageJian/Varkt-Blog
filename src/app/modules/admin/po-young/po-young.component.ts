import { Component, OnInit } from '@angular/core';
import {PoYoungService} from "./po-young.service";
import {DialogAlertComponent} from "../../../shared/components/alert-dialog/dialog-alert.component";
import {PyCodeModel, PyRecordModel, PyUserModel, ResModel} from "../../../shared/models";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-po-young',
  templateUrl: './po-young.component.html',
  styleUrls: ['./po-young.component.css']
})
export class PoYoungComponent implements OnInit {
  records = [];
  recordsColumns: string[] = ['id','ip','time_log','remark','py_name','phone','operation'];
  users = [];
  usersColumns: string[] = ['id','imei','phone','py_name','operation'];
  codes = [];
  codesColumns: string[] = ['id', 'code', 'times','operation'];
  newCode: PyCodeModel = new PyCodeModel();

  constructor(
    private poYoungService: PoYoungService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.poYoungService.getPyUsers().subscribe((res:PyUserModel[]) => this.users = res);
    this.poYoungService.getPyRecords().subscribe((res:PyRecordModel[]) => this.records = res);
    this.poYoungService.getCodes().subscribe((res:PyCodeModel[]) => this.codes = res);
  }

  changeFile(event){
    const fileList = event.target.files;
    const file: File = fileList[0];
    let formData = new FormData();
    formData.append('PoYoungApk', file, file.name);
    this.poYoungService.uploadApk(formData).subscribe(res => {
      this.matSnackBar.open('Uploaded Successfully', "Close");
    });
  }

  deleteUser(u: PyUserModel){
    this.poYoungService.deletePyUser(u).subscribe((res:ResModel) => {
      if (res.errcode) {
        this.poYoungService.getPyUsers().subscribe((res:PyUserModel[]) => this.users = res);
      }
    })
  }

  deleteRecord(r: PyRecordModel){
    this.poYoungService.deletePyRecord(r).subscribe((res:ResModel) => {
      if (res.errcode) {
        this.poYoungService.getPyRecords().subscribe((res:PyRecordModel[]) => this.records = res);
      }
    })
  }

  addCode(obj: PyCodeModel) {
    this.poYoungService.addCode(obj.times).subscribe((res: ResModel) => {
      if (res.errcode) {
        this.poYoungService.getCodes().subscribe((res: PyCodeModel[]) => this.codes = res);
      }
    });
  }

  deleteCode(obj: PyCodeModel){
    this.poYoungService.deleteCode(obj).subscribe((res: ResModel) => {
      if (res.errcode) {
        this.poYoungService.getCodes().subscribe((res:PyCodeModel[]) => this.codes = res);
      }
    })
  }

}
