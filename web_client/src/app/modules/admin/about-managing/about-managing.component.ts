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
  model: AboutModel;

  constructor(
    private elementRef: ElementRef,
    private aboutManagingServer: AboutManagingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  public onSubmit() {
    this.aboutManagingServer.putAbout(this.model).subscribe((res: ResModel) => {
      this.snackBar.open(res.message, 'close', {duration: 5_000});
    });
  }
}
