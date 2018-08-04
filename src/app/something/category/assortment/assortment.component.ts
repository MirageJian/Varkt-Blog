import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../../shared/animations/index';
import {FormControl} from '@angular/forms';
import {SomethingService} from "../../something.service";
import {ArticleModel, ListArticleModel} from "../../../shared/models";
import {JsonHelperTool} from "../../../shared/tools/json-helper.tool";

@Component({
  selector: 'app-assortment',
  templateUrl: './assortment.component.html',
  styleUrls: ['./assortment.component.scss'],
  animations: slideInDownAnimation
})
export class AssortmentComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  keyword = '';
  listArticle = [];
    toppings = new FormControl();

    toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selectedValue: string;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    private somethingService: SomethingService,
  ) { }

  ngOnInit() {
  }

  searchArticle() {
    this.somethingService.getSearchResult(this.keyword).subscribe((res: ListArticleModel[]) => {
      this.listArticle = res;
      for (const a of this.listArticle) {
        JsonHelperTool.toAny(a, ['category']);
      }
    })
  }
}
