import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ErrorPageEnum} from "./error-page.enum";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  type: number;
  errorPageEnum = ErrorPageEnum;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const type = +this.route.snapshot.paramMap.get('type');
    this.type = type ? type : ErrorPageEnum.notFound;
  }

}
