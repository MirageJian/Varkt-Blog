import {
  Component,
  ComponentFactoryResolver,
  Directive,
  ElementRef, HostBinding,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {loadingAni} from "@shared/animations";

@Directive({
  selector: '[appProgress]'
})
export class ProgressDirective {

  componentFactory;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
  ) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(DataProgressComponent);
  }

  @Input() set appProgress(hasData: boolean) {
    this.viewContainer.clear();
    if (hasData) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.createComponent(this.componentFactory);
    }
  }
}

@Component({
  template: `
    <div class="spinner-container">
      <mat-spinner color="loading"></mat-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      width: 100%;
      display: flex;
      flex: 1 1 auto;
      justify-content: center;
      align-items: center;
    }
  `],
  animations: []
})
export class DataProgressComponent {
}
