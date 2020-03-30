import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JsonHelper} from "@shared/tools";
import {AboutService} from "./about.service";
import {AboutModel} from "@shared/models/about.model";
import {slideFromBottom} from "@shared/animations";
import Quill from "quill";
import {ActivatedRoute} from "@angular/router";
import {EditorComponent} from "@shared/components/editor/editor.component";
// declare var require: any;
// const Quill = require('quill');


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideFromBottom()]
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', {static: false}) private editor: EditorComponent;
  article: AboutModel;
  quill: Quill;

  constructor(
    private generalService: AboutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((res: {data: AboutModel}) => {
      console.log(res.data);
      this.article = res.data;
      JsonHelper.toAny(this.article, JsonHelper.ABOUT_MEMBER);
    });
    // this.generalService.getAbout().subscribe((res: AboutModel) => {
    //   this.article = res;
    //   JsonHelper.toAny(this.article, JsonHelper.ABOUT_MEMBER);
    //   this.quill.setContents(res.content);
    // })
  }
  ngAfterViewInit(): void {
    this.editor.quill.setContents(this.article.content);
  }

}
