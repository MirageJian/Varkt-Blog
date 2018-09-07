import { Component, OnInit } from '@angular/core';
import {CategoryModel, ResModel} from "../../../shared/models";
import {SettingService} from "./setting.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  category = new CategoryModel();
  categories: CategoryModel[];
  categoriesColumns = ['icon', 'label', 'operation'];

  constructor(
    private settingService: SettingService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }
  deleteCategory(c: CategoryModel) {
    this.settingService.deleteCategory(c).subscribe((res: ResModel) => {
      if (res.errcode) {
        this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
          this.categories = res;
        });
        this.matSnackBar.open('error' + res.errmsg, 'Close');
      } else {
        this.matSnackBar.open('error' + res.errmsg, 'Close');
      }
    });
  }
  addCategory(c: CategoryModel) {
    this.settingService.addCategory(c).subscribe((res: ResModel) => {
      if (res.errcode) {

        this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
          this.categories = res;
        });
      } else {
        this.matSnackBar.open(res.errmsg, 'Close');
      }
    });
  }
}
