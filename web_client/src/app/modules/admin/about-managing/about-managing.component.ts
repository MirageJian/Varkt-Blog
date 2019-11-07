import {Component, ElementRef, OnInit} from '@angular/core';
import {JsonHelper} from "@shared/tools";
import {AboutModel} from "@shared/models/about.model";
import {AboutManagingService} from "./about-managing.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResModel} from "@shared/models";
import {slideFromBottom} from "@shared/animations";

@Component({
  selector: 'app-about-managing',
  templateUrl: './about-managing.component.html',
  styleUrls: ['./about-managing.component.css'],
  animations: [slideFromBottom()]
})
export class AboutManagingComponent implements OnInit {
  quill: any;
  model: AboutModel;

  constructor(
    private elementRef: ElementRef,
    private aboutManagingServer: AboutManagingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  public onSubmit() {
    this.model.content = this.quill.getContents();
    this.aboutManagingServer.putAbout(this.model).subscribe((res: ResModel) => {
      if (res.errcode === 0) {
        this.snackBar.open(res.errmsg, 'close', {duration: 5_000});
      } else {
        this.snackBar.open(res.errmsg, 'close', {duration: 5_000});
      }
    });
  }
  onQuillInit(quill) {
    this.quill = quill;
    this.aboutManagingServer.getAbout().subscribe((res: AboutModel) => {
      if (res != null) {
        JsonHelper.toAny(res, JsonHelper.ABOUT_MEMBER);
        this.model = res;
        this.quill.setContents(this.model.content);
      }
    });
  }
}
