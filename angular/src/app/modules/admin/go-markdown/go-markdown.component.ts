import {Component, OnInit} from '@angular/core';
import {slideFromBottom} from "@shared/animations";
import {ArticleModel, CategoryModel, ResModel} from "@shared/models";
import {SomethingService} from "../../public/services/something.service";
import {WritingService} from "../services/writing.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EMPTY} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "@shared/app-const";

@Component({
  templateUrl: './go-markdown.component.html',
  styleUrls: ['./go-markdown.component.css'],
  animations: [slideFromBottom()]
})
export class GoMarkdownComponent implements OnInit {
  article: ArticleModel = new ArticleModel();
  categories: CategoryModel[];
  // Show preview of markdown or not
  isPreview: boolean;

  constructor(
    private _somethingService: SomethingService,
    private _writingService: WritingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    // Get categories
    this._somethingService.getListCategory().subscribe((res: CategoryModel[]) => {
      this.categories = res;
    });
    // Get article considering switch to router Resolve mode
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const id = +params.get('id');
      return id ? this._writingService.getArticle(+params.get('id')) : EMPTY
    })).subscribe((res: ArticleModel) => {
      if (res) this.article = res;
    });
  }

  onSubmit() {
    this._writingService.addOrUpdateArticle(this.article).subscribe((res: ResModel) => {
      if (res && res.code === 0) {
        this.snackBar.open('Operation successful.', 'Ok', {duration: SNACKBAR_DURATION.short})
      }
    });
  }

  resetArticle() {
    this.article = new ArticleModel();
  }

}
