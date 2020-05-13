import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AboutService} from "./about.service";
import {AboutModel} from "@shared/models/about.model";
import {slideFromBottom} from "@shared/animations";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideFromBottom()]
})
export class AboutComponent implements OnInit, AfterViewInit {
  // article: AboutModel;
  about$: Observable<AboutModel>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.data.subscribe((res: {data: AboutModel}) => {
    //   this.article = res.data;
    // });
    this.about$ = this.route.data.pipe(map((res: {data: AboutModel}) => res.data));
  }
  ngAfterViewInit(): void {

  }

}
