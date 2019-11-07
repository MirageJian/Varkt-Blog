import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SomethingService} from '../something.service';
import {CategoryModel} from '@shared/models';
import {MatSidenav} from "@angular/material/sidenav";
import {MOBILE_WIDTH} from "@shared/app-const";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  label: string;
  categories: Array<CategoryModel>;
  // check if the device is mobile
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private somethingService: SomethingService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia(MOBILE_WIDTH);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addEventListener('mobileQuery', this._mobileQueryListener);
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // const id = +this.route.snapshot.firstChild.paramMap.get('id'); // firstChild is the first childer route
    this.somethingService.getListCategory().subscribe(res => {
      this.categories = res;
    });
    this.route.paramMap.pipe().subscribe((paramMap: ParamMap) => {
      const param = paramMap.get('label');
      this.label = param ? param : 'Filter';
      // try to close the sidenav when mobile
      if (this.mobileQuery.matches) {
        this.sidenav.close().then();
      }
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
}
