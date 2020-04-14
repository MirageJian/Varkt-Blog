import {Component, ElementRef, OnInit} from '@angular/core';
import {AboutModel} from "@shared/models/about.model";
import {AboutManagingService} from "./about-managing.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResModel} from "@shared/models";
import {slideFromBottom} from "@shared/animations";

@Component({
  templateUrl: './about-managing.component.html',
  styleUrls: ['./about-managing.component.css'],
  animations: [slideFromBottom()]
})
export class AboutManagingComponent implements OnInit {
  aboutModel: AboutModel = new AboutModel();

  constructor(
    private elementRef: ElementRef,
    private _aboutService: AboutManagingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._aboutService.getAbout().subscribe((res: AboutModel) => {
      this.aboutModel = res;
    })
  }
  public onSubmit() {
    this._aboutService.updateAbout(this.aboutModel).subscribe((res: ResModel) => {
      this.snackBar.open(res.message, 'close', {duration: 5_000});
    });
  }
}
