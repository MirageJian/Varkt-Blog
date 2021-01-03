import {Component, ElementRef, OnInit} from '@angular/core';
import {AboutModel} from "@const/models";
import {AboutManagingService} from "../services/about-managing.service";
import {slideFromBottom} from "@const/animations";

@Component({
  templateUrl: './about-managing.component.html',
  styleUrls: ['./about-managing.component.css'],
  animations: [slideFromBottom()]
})
export class AboutManagingComponent implements OnInit {
  aboutModel: AboutModel = new AboutModel();

  constructor(
    private elementRef: ElementRef,
    private _aboutService: AboutManagingService
  ) { }

  ngOnInit() {
    this._aboutService.getAbout().subscribe((res: AboutModel) => {
      this.aboutModel = res;
    })
  }
  public onSubmit() {
    this._aboutService.updateAbout(this.aboutModel).subscribe();
  }
}
