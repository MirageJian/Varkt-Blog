import { Component, OnInit } from '@angular/core';
import {PoYoungService} from "./po-young.service";
import {DialogAlertComponent} from "../../../shared/components/alert-dialog/dialog-alert.component";
import {MatDialog} from "@angular/material";
import {ResModel} from "../../../shared/models";

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

  constructor(
    private poYoungService: PoYoungService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.poYoungService.getPyUsers().subscribe((res:PyUserModel[]) => this.users = res);
    this.poYoungService.getPyRecords().subscribe((res:PyRecordModel[]) => this.records = res);
  }

  changeFile(event){
    const fileList = event.target.files;
    const file:File = fileList[0];
    let formData:FormData = new FormData();
    formData.append('PoYoungApk', fileList[0], file.name);
    this.poYoungService.uploadApk(formData).subscribe(res => {
      this.dialog.open(DialogAlertComponent, {data:{msg: 'uploaded successfully'}});
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

}
