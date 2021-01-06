import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "@const/models";
import {SomethingManagingService} from "../../services/something-managing.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {slideFromBottom} from "@const/animations";

@Component({
  selector: 'app-categories-managing',
  templateUrl: './categories-managing.component.html',
  styleUrls: ['./categories-managing.component.css']
})
export class CategoriesManagingComponent implements OnInit {
  category = new CategoryModel();
  categories: CategoryModel[];
  categoriesColumns = ['icon', 'label', 'operation'];

  constructor(
    private settingService: SomethingManagingService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.category.icon = 'code';
    this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }
  deleteCategory(c: CategoryModel) {
    this.settingService.deleteCategory(c).subscribe(() => {
      this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
        this.categories = res;
      });
    });
  }
  addCategory(c: CategoryModel) {
    this.settingService.addCategory(c).subscribe(() => {
      this.settingService.getListCategory().subscribe((res: CategoryModel[]) => {
        this.categories = res;
      });
    });
  }
}
