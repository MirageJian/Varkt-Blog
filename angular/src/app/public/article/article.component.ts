import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {routerTrans, slideFromBottom} from '@const/animations';
import {ArticleModel, CommentModel} from '@const/models';
import {APP_TILE} from '@const/app-const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ArticleService} from '../services/article.service';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['../../shared/base-page.style.css', './article.component.scss'],
  animations: [routerTrans, slideFromBottom()]
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('@routerTrans') routeAnimation = true;

  article: ArticleModel;
  comments: CommentModel[];
  newComment = new CommentModel();

  constructor(
    private _articleService: ArticleService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.newComment.author = '';
    this.route.data.subscribe((res: {data: ArticleModel}) => {
      // Set page tile
      this.titleService.setTitle(res.data.title);
      // Get comments
      this._articleService.getComments(res.data.id).subscribe((res: CommentModel[]) => {
        this.comments = res;
      });
      this.article = res.data;
    });
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.services.getHero(id);
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.somethingService.getArticle(+params.get('id')))
    // )
  }

  ngAfterViewInit(): void {

  }

  // Submit a new comment
  onSubmit() {
    this.newComment.id_article = this.article.id;
    this._articleService.postComment(this.newComment).subscribe(() => {
      this.comments.push({...this.newComment});
      this.snackBar.open('Success', 'Close', {duration: 5_000});
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
