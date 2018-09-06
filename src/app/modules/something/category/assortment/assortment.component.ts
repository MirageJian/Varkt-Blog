import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../../../shared/animations';
import {FormControl} from '@angular/forms';
import {SomethingService} from "../../something.service";
import {ListArticleModel} from "../../../../shared/models";
import {JsonHelper} from "../../../../shared/tools";

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
        JsonHelper.toAny(a, ['category']);
      }
    })
  }
}
