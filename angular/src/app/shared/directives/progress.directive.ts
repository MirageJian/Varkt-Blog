import {
  Component, ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef, HostBinding,
  Input, OnChanges, SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {slideFromBottom} from '@const/animations';

@Directive({
  selector: '[appDataStatus]'
})
export class ProgressDirective implements OnChanges {
  private readonly dataProcessingFactory: ComponentFactory<DataProgressComponent>;
  private readonly noDataTipFactory: ComponentFactory<NoDataTipComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef,
  ) {
    this.dataProcessingFactory = this.componentFactoryResolver.resolveComponentFactory(DataProgressComponent);
    this.noDataTipFactory = this.componentFactoryResolver.resolveComponentFactory(NoDataTipComponent);
  }

  @Input('appDataStatus') data: Array<unknown> | boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.viewContainer.clear();
    if (this.data instanceof Array) {
      // When there is no data
      if (!this.data.length) this.viewContainer.createComponent(this.noDataTipFactory);
      else this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // if (typeof this.data === 'boolean')
      // When the data is not an array
      if (!!this.data) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.createComponent(this.dataProcessingFactory);
      }
    }
  }
}

@Component({
  template: `
    <mat-spinner color="loading"></mat-spinner>
    <h3 i18n>Loading...</h3>
  `,
  styleUrls: ['progress.directive.css'],
})
export class DataProgressComponent {
}

@Component({
  template: `
    <img src="../../../assets/svg/undraw_barbecue_3x93.svg" alt="No items"/>
    <h3 i18n>No data right now, try other places</h3>
  `,
  styleUrls: ['progress.directive.css'],
  animations: [slideFromBottom('margin')]
})
export class NoDataTipComponent {
  @HostBinding('@slideFromBottom') _;
}

