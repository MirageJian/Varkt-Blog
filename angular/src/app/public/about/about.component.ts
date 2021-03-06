import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AboutModel} from '@const/models';
import {slideFromBottom} from '@const/animations';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['../../shared/base-page.style.css', './about.component.css'],
  animations: [slideFromBottom()]
})
export class AboutComponent implements OnInit, AfterViewInit {
  // article: AboutModel;
  about$: Observable<AboutModel>;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.data.subscribe((res: {data: AboutModel}) => {
    //   this.article = res.data;
    // });
    this.about$ = this.route.data.pipe(map((res: {data: AboutModel}) => res.data));
  }
  ngAfterViewInit(): void {

  }

}
