import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from "../general.service";
import {ArticleModel} from "../../shared/models";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SomethingService} from "../../something/something.service";
import {JsonHelperTool} from "../../shared/tools/json-helper.tool";
declare var require: any;
const Quill = require('quill');


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('editor') editor: ElementRef;
  article = new ArticleModel();

  constructor(
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.generalService.getAbout().subscribe((res: ArticleModel) => {
      this.article = res ? res : {title: 'no about', category: [], content: ''} as ArticleModel;
      JsonHelperTool.toAny(this.article, JsonHelperTool.articleMember);
      this.quillInit(this.article.content);
    })
  }

  quillInit(content: any) {
    const options = {
      modules: {
        toolbar: false    // Snow includes toolbar by default
      },
      readOnly: true,
      theme: 'snow'
    };
    const quill = new Quill(this.editor.nativeElement, options);
    quill.setContents(content);
  }
}
