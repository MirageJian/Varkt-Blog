import {Component, OnInit} from '@angular/core';
import {CategoryModel, ResModel} from "@shared/models";
import {SettingsService} from "../../services/settings.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {slideFromBottom} from "@shared/animations";

@Component({
  selector: 'app-categories-managing',
  templateUrl: './categories-managing.component.html',
  styleUrls: ['./categories-managing.component.css'],
  animations: [slideFromBottom()]
})
export class CategoriesManagingComponent implements OnInit {
  category = new CategoryModel();
  categories: CategoryModel[];
  categoriesColumns = ['icon', 'label', 'operation'];

  constructor(
    private settingService: SettingsService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.category.icon = 'code';
    this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }
  deleteCategory(c: CategoryModel) {
    this.settingService.deleteCategory(c).subscribe((res: ResModel) => {
      if (!res.code) {
        this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
          this.categories = res;
        });
        this.matSnackBar.open('error' + res.message, 'Close');
      } else {
        this.matSnackBar.open('error' + res.message, 'Close');
      }
    });
  }
  addCategory(c: CategoryModel) {
    this.settingService.addCategory(c).subscribe((res: ResModel) => {
      if (!res.code) {
        this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
          this.categories = res;
        });
      } else {
        this.matSnackBar.open(res.message, 'Close');
      }
    });
  }
}
