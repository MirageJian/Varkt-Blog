import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {SomethingService} from '../something.service';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  label: String;
  categories: Array<CategoryModel>;
  // check if the device is mobile
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private somethingService: SomethingService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // const id = +this.route.snapshot.firstChild.paramMap.get('id'); // firstChild is the first childer route
    this.somethingService.getListCategory().subscribe(res => {
      this.categories = res;
    });
    const param = this.route.snapshot.paramMap.get('label');
    this.label = param ? param : 'Filter';
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  // // this is the complex way of goto article. you need 'selected' to active what you just sleceted.
  // gotoArticle(sidenav: any, item: SomethingListModel) {
  //   this.router.navigate(['../', item.id, { foo: 'foo' }], { relativeTo: this.route });
  //   this.checkOperationNav(sidenav, item.title);
  // }
  checkOperationNav(title: String, sidenav: any) {
    if (this.mobileQuery.matches) {
      sidenav.close();
    }
    this.label = title;
    this.router.navigate(['./', {label: this.label}]).then();
  }
}
