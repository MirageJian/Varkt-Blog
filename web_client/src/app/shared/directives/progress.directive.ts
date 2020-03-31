import {Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Component, ComponentFactoryResolver} from '@angular/core';

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

    @Input() set appProgress(condition: boolean) {
        this.viewContainer.clear();
        if (condition) {
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
})
export class DataProgressComponent {
}
