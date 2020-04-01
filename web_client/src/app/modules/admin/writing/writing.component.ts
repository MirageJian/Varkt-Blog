import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArticleModel, CategoryModel, ResModel} from '@shared/models';
import {WritingService} from './writing.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {JsonHelper} from '@shared/tools';
import {EditorComponent} from "@shared/components/editor/editor.component";

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', {static: false}) private editor: EditorComponent;
  @ViewChild('quillImgField', { static: false }) quillImgField: ElementRef;

  article: ArticleModel;
  categories: CategoryModel[];

  public constructor(
    private elementRef: ElementRef,
    private writingService: WritingService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    // data init
    this.article = new ArticleModel();
    this.writingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
  }

  ngAfterViewInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.writingService.getArticle(+params.get('id')))
    ).subscribe((res: ArticleModel) => {
      if (res != null) {
        JsonHelper.toAny(res, JsonHelper.articleMember);
        this.article = res;
        this.editor.quill.setContents(this.article.content);
      }
    });
  }

  public onSubmit() {
    this.article.content = this.editor.quill.getContents();
    console.log(this.article.content);
    if (this.article.id!=0) {
      this.writingService.postArticle(this.article, this.editor.quill.getText()).subscribe((res: ResModel) => {
        if (res.errcode === 0) {
          this.router.navigate(['../managing'], {relativeTo: this.route}).then();
        } else {
          alert(res.errmsg);
        }
      });
    } else {
      this.writingService.putArticle(this.article, this.editor.quill.getText()).subscribe((res: ResModel) => {
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
