import {
  Component,
  OnInit,
  HostBinding,
  OnDestroy,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {routeAnimation} from '@shared/animations';
import {SomethingService} from '../something/something.service';
import {ArticleModel, ResModel, CommentModel} from '@shared/models';
import {switchMap} from 'rxjs/operators';
import {JsonHelper} from '@shared/tools';
import {APP_TILE} from "@shared/app-const";
import Quill from "quill";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditorComponent} from "@shared/components/editor/editor.component";
import {ArticleService} from "./article.service";
import {Title} from "@angular/platform-browser";
import {HeaderComponent} from "@shared/components/header/header.component";


// declare var require: any;
// const Quill = require('quill');

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: routeAnimation
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-direction') direction = 'column';
  @HostBinding('style.width') width = '100%';
  // @HostBinding('style.position')  position = 'absolute';
  @ViewChild('editor') private editor: EditorComponent;
  article: ArticleModel;
  comments: CommentModel[];
  newComment = new CommentModel();

  constructor(
    private _articleService: ArticleService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    this.newComment.author = '';
    this.route.data.subscribe((res: {data: ArticleModel}) => {
      JsonHelper.toAny(res.data, JsonHelper.articleMember);
      this.article = res.data;
      // Set page tile
      this.titleService.setTitle(this.article.title);
      // Get comments
      this._articleService.getComments(this.article.id).subscribe((res: CommentModel[]) => {
        this.comments = res;
      });
    });
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.services.getHero(id);
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.somethingService.getArticle(+params.get('id')))
    // )
  }

  ngAfterViewInit(): void {
    this.editor.quill.setContents(this.article.content);
    this.el.nativeElement.scrollIntoView();
  }

  // Submit a new comment
  onSubmit() {
    this.newComment.id_article = this.article.id;
    this._articleService.postComment(this.newComment).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.comments.push({...this.newComment});
        this.snackBar.open('Success', 'Close', {duration: 5_000});
      } else this.snackBar.open(res.errmsg, 'Close', {duration: 5_000});
    });
  }

  likeComment(c: CommentModel) {
    c.likes += 1;
  }

  ngOnDestroy() {
    // Reset page tile
    this.titleService.setTitle(APP_TILE);
  }
}
