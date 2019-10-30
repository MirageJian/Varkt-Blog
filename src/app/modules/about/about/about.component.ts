import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JsonHelper} from "@shared/tools";
import {AboutService} from "../about.service";
import {AboutModel} from "@shared/models/about.model";
import {slideFromBottom} from "@shared/animations";
// declare var require: any;
// const Quill = require('quill');


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideFromBottom()]
})
export class AboutComponent implements OnInit {
  @ViewChild('editor', {static: false}) editor: ElementRef;
  article: AboutModel;
  quill: any;

  constructor(
    private generalService: AboutService,
  ) { }

  ngOnInit() {
    this.generalService.getAbout().subscribe((res: AboutModel) => {
      this.article = res;
      JsonHelper.toAny(this.article, JsonHelper.ABOUT_MEMBER);
      this.quill.setContents(res.content);
    })
  }
}
