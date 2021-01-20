import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-layout></app-layout>`,
})
export class AppComponent implements OnInit {

  constructor(
    // private xsrfExtractor: HttpXsrfTokenExtractor,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.flexDirection = 'column';
  }

}
