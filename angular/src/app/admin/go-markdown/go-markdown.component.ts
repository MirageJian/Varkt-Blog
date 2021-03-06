import {Component, OnInit} from '@angular/core';
import {slideFromBottom} from '@const/animations';
import {ArticleModel, CategoryModel} from '@const/models';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SNACKBAR_DURATION} from '@const/app-const';
import {WritingManagingService} from '../services/writing-managing.service';
import {SomethingManagingService} from '../services/something-managing.service';

@Component({
  templateUrl: './go-markdown.component.html',
  styleUrls: ['./go-markdown.component.css'],
  animations: [slideFromBottom()],
})
export class GoMarkdownComponent implements OnInit {
  article: ArticleModel = new ArticleModel();
  categories: CategoryModel[];
  // Show preview of markdown or not
  isPreview: boolean;

  constructor(
    private _somethingService: SomethingManagingService,
    private _writingService: WritingManagingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    // Get categories
    this._somethingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
    // Get article considering switch to router Resolve mode
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = +params.get('id');
          return id ? this._writingService.getArticle(+params.get('id')) : EMPTY;
        }),
      )
      .subscribe((res: ArticleModel) => {
        if (res) this.article = res;
      });
  }

  onSubmit() {
    this._writingService.addOrUpdateArticle(this.article).subscribe(article => {
      this.snackBar.open('Operation successful.', 'Ok', {duration: SNACKBAR_DURATION.short});
      this.router.navigate(['/article', article.id]).then();
    });
  }

  resetArticle() {
    this.article = new ArticleModel();
  }
}
