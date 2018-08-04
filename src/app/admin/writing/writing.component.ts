import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleModel, CategoryModel, ResModel} from '../../shared/models';
import {WritingService} from './writing.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {JsonHelperTool} from '../../shared/tools/json-helper.tool';

declare var require: any;
const Quill = require('quill');

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss',]
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
      }, theme: 'snow',
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
        JsonHelperTool.toAny(res, JsonHelperTool.articleMember);
        this.article = res;
        this.quill.setContents(this.article.content);
      }
    });
  }

  onSubmit() {
    this.article.content = this.quill.getContents();
    if (this.article.hasOwnProperty('id')) {
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
