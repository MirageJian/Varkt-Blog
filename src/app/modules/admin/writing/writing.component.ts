import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ArticleModel, CategoryModel, ResModel} from '../../../shared/models';
import {WritingService} from './writing.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {JsonHelper} from '../../../shared/tools';
import {MatSnackBar} from "@angular/material";

declare var require: any;
const Quill = require('quill');

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class WritingComponent implements OnInit {
  quill: any;
  @ViewChild('editor') editor: ElementRef;
  article: ArticleModel;
  categories: CategoryModel[];

  constructor(
    private elementRef: ElementRef,
    private writingService: WritingService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    // quill init
    this.quill = new Quill(this.editor.nativeElement, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction
          [{'size': [false, 'small', 'large', 'huge']}],  // custom dropdown
          [{'header': [false, 1, 2, 3, 4, 5, 6]}],
          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],
          ['clean', 'image']
        ]
      }, theme: 'snow', placeholder: 'Please write something right here...', //debug: 'info',
    });
    // data init
    this.article = new ArticleModel();
    this.writingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.writingService.getArticle(+params.get('id')))
    ).subscribe((res: ArticleModel) => {
      if (res != null) {
        JsonHelper.toAny(res, JsonHelper.articleMember);
        this.article = res;
        this.quill.setContents(this.article.content);
      }
    });
  }

  onSubmit() {
    this.article.content = this.quill.getContents();
    if (this.article.id!=0) {
      this.writingService.postArticle(this.article, this.quill.getText()).subscribe((res: ResModel) => {
        if (res.errcode === 0) {
          this.router.navigate(['../managing'], {relativeTo: this.route}).then();
        } else {
          alert(res.errmsg);
        }
      });
    } else {
      this.writingService.putArticle(this.article, this.quill.getText()).subscribe((res: ResModel) => {
        if (res.errcode === 0) {
          this.router.navigate(['../../something', res.data], {relativeTo: this.route}).then();
        } else {
          alert(res.errmsg);
        }
      });
    }
  }

  goBack() {
      this.router.navigate(['../managing'], {relativeTo: this.route}).then();
  }
}
