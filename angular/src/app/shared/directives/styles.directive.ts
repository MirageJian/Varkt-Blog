import {Directive, ElementRef, Host, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[fullWidth]'
})
export class FullWidthDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.width = '100%';
  }
}

@Directive({selector: '[noPadding]'})
export class NoPaddingDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.padding = '0';
  }
}

@Directive({selector: '[iconMargin]'})
export class IconMarginDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.marginLeft = '8px';
  }
}
