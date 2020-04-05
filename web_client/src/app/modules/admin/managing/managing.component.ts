import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ListArticleModel, ResModel, CommentModel} from '@shared/models';
import {ManagingService} from './managing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SomethingService} from "../../something/something.service";

@Component({
  selector: 'app-manage',
  templateUrl: './managing.component.html',
  styleUrls: ['./managing.component.scss']
})
export class ManagingComponent implements OnInit, OnDestroy {
  private destroyer: () => void;
  articles: ListArticleModel[];
  originalArticles: ListArticleModel[];
  comments: CommentModel[];
  searchKeyword: string;

  constructor(
    private render: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private managingService: ManagingService,
    private _somethingService: SomethingService
  ) {
  }

  ngOnInit() {
    // 将监听者放入一个函数里，然后调用这个函数就可以销毁。
    this.destroyer = this.render.listen('window', 'scroll', (event) => {
      const position = event.path[1].pageYOffset + event.path[0].body.clientHeight;
      if (position === event.path[0].body.scrollHeight) {
        // your action at there
      }
    });
    this.managingService.getAllArticle().subscribe((res: ListArticleModel[]) => {
      // JsonHelper.toAny(res, ['category']);
      this.articles = res;
      this.originalArticles = res;
    });
  }
  ngOnDestroy() {
    this.destroyer();
  }
  deleteArticle(a: ListArticleModel): void {
    this.managingService.deleteArticle(a.id).subscribe(() => {
      this.articles.splice(this.articles.findIndex((ff) => ff.id === a.id), 1);
      this.originalArticles = this.articles;
    });
  }
  toWriting(a: ListArticleModel) {
    this.router.navigate(['../writing', {id: a.id}], {relativeTo: this.route}).then();
  }
  searchArticle() {
    this._somethingService.getSearchResult(this.searchKeyword).subscribe((res: ListArticleModel[]) => {
      this.articles = res;
    });
  }
  openPanel(id: number) {
    this.managingService.getComments(id).subscribe((res: CommentModel[]) => {
      this.comments = res;
    })
  }
  deleteComment(c: CommentModel) {
    this.managingService.deleteComment(c.id).subscribe((res: ResModel) => {
      if (!res.errcode) {
        this.comments.splice(this.comments.findIndex((ff) => ff.id === c.id), 1);
        alert('success');
      } else {
        alert(res.errmsg);
      }
    })
  }
}
