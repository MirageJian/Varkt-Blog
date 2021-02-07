import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute} from '@angular/router';
import {SomethingService} from '../services/something.service';
import {CategoryModel} from '@const/models';
import {MatSidenav} from '@angular/material/sidenav';
import {MOBILE_WIDTH} from '@const/app-const';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: Array<CategoryModel>;
  // Check if the device is mobile
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private _somethingService: SomethingService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia(MOBILE_WIDTH);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addEventListener('mobileQuery', this._mobileQueryListener);
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.data.subscribe((res: {categories: CategoryModel[]}) => {
      this.categories = res.categories;

    });
  }
  ngOnDestroy() {
    // this.mobileQuery.removeEventListener('mobileQuery', this._mobileQueryListener);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  // // this is the stupidest way to change list of articles!!
  // // this is the complex way of goto article. you need 'selected' to active what you just sleceted.
  // gotoArticle(sidenav: any, item: SomethingListModel) {
  //   this.router.navigate(['../', item.id, { foo: 'foo' }], { relativeTo: this.route });
  //   this.checkOperationNav(sidenav, item.title);
  // }
  // checkOperationNav(title: string, sidenav: any) {
  //   this.label = title;
  //   this.router.navigate(['./', {label: this.label}]).then();
  // }

  sideNavAction() {
    if (this.mobileQuery.matches) {
      this.sidenav.close().then();
    }
  }
}
