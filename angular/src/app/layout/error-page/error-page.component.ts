import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  url: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
  }

}
