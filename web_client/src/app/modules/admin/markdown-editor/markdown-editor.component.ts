import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {slideFromBottom} from "@shared/animations";
import {ArticleModel, CategoryModel, ResModel} from "@shared/models";
import {FileUploadService} from "@app-services/file-upload.service";
import {SomethingService} from "../../something/something.service";
import {ArticleService} from "../../article/article.service";
import {WritingService} from "./writing.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {JsonHelper} from "@shared/tools";
import {EMPTY} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "@shared/app-const";

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  animations: [slideFromBottom()]
})
export class MarkdownEditorComponent implements OnInit {
  @ViewChild('imgUploadInput') imgUploadInput: ElementRef;
  @ViewChild('text') text: ElementRef;
  article: ArticleModel = new ArticleModel();
  categories: CategoryModel[];

  constructor(
    private render: Renderer2,
    private _fileUpload: FileUploadService,
    private _somethingService: SomethingService,
    private _articleService: ArticleService,
    private _writingService: WritingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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
      return id ? this._articleService.getArticle(+params.get('id')) : EMPTY
    })).subscribe((res: ArticleModel) => {
      if (res) this.article = res;
    });
  }

  onSubmit() {
    if (this.article.id != 0) { // Update an article
      this._writingService.updateArticle(this.article, 'This is description').subscribe((res: ResModel) => {
        if (res && res.errcode === 0) {
          this.snackBar.open('Successful', 'Ok', {duration: SNACKBAR_DURATION.short})
        }
      });
    } else { // Create an article
      this._writingService.addArticle(this.article, 'This is description').subscribe((res: ResModel) => {
        if (res && res.errcode === 0) {
          this.snackBar.open('Successful', 'Ok', {duration: SNACKBAR_DURATION.short})
        }
      });
    }
  }

  resizeTextarea() {
    this.render.setStyle(this.text.nativeElement, 'height', 'auto');
    this.render.setStyle(this.text.nativeElement, 'height', this.text.nativeElement.scrollHeight + 'px');
  }

  insertImage() {
    const file = this.imgUploadInput.nativeElement.files[0];
    // console.log(formData);
    this._fileUpload.uploadArticleImage(file).subscribe((res: ResModel) => {
      if (!res.errcode) {
        // Upload image successfully and get selection cursor
        const selectionStart = (this.text.nativeElement as HTMLTextAreaElement).selectionEnd;
        this.article.content = this.article.content.slice(0, selectionStart)
          + `<img src=\"${res.data}\" width=\"100%\" alt=\"\">`
          + this.article.content.slice(selectionStart);
        // Resize the textarea for better experience
        this.resizeTextarea();
      }
    });
  }
}
