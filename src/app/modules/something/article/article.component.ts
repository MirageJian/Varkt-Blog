import {Component, OnInit, HostBinding, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';

import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {slideInDownAnimation} from '../../../shared/animations';
import {SomethingService} from '../something.service';
import {ArticleModel, ResModel, CommentModel} from '../../../shared/models';
import {switchMap} from 'rxjs/operators';
import {JsonHelper} from '../../../shared/tools';

declare var require: any;
const Quill = require('quill');

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: slideInDownAnimation,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-direction') direction = 'column';
  @HostBinding('style.width') width = '100%';
  // @HostBinding('style.position')  position = 'absolute';
  @ViewChild('editor') editor: ElementRef;
  article = new ArticleModel();
  comments: CommentModel[];
  newComment = new CommentModel();

  constructor(
    private somethingService: SomethingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.somethingService.getArticle(+params.get('id')))
    ).subscribe((article: ArticleModel) => {
      JsonHelper.toAny(article, JsonHelper.articleMember);
      this.article = article;
      this.quillInit(this.article.content);
      this.somethingService.getComments(this.article.id).subscribe((res: CommentModel[]) => {
        this.comments = res;
      })
    });
    // let id = this.route.snapshot.paramMap.get('id');
    // this.hero$ = this.services.getHero(id);
    this.newComment.author = '';
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
  onSubmit() {
    this.newComment.id_article = this.article.id;
    this.somethingService.putComment(this.newComment).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.comments.push({...this.newComment});
        alert('success');
      } else {
        alert(res.errmsg);
      }
    }, err => {
      alert(err);
    })
  }
  likeComment(c: CommentModel) {
    c.likes += 1;
  }
}
