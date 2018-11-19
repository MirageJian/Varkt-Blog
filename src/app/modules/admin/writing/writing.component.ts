import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ArticleModel, CategoryModel, ResModel} from '../../../shared/models';
import {WritingService} from './writing.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {JsonHelper} from '../../../shared/tools';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class WritingComponent implements OnInit {
  quill: any;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('quillImgField') quillImgField: ElementRef;

  article: ArticleModel;
  categories: CategoryModel[];

  public constructor(
    private elementRef: ElementRef,
    private writingService: WritingService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
  ) {
  }

  public ngOnInit() {
    // data init
    this.article = new ArticleModel();
    this.writingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }
  onQuillInit(){
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
  public onSubmit() {
    this.article.content = this.quill.getContents();
    console.log(this.article.content);
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
