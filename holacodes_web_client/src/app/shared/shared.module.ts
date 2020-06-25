import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {DataProgressComponent, ProgressDirective} from './directives/progress.directive';
import {DialogAlertComponent} from "./components/alert-dialog/dialog-alert.component";
import {AllMatCdkModule} from "./all-mat-cdk.module";

@NgModule({
  imports: [
    CommonModule,
    AllMatCdkModule
  ],
  declarations: [
    HeaderComponent,
    ProgressDirective,
    DataProgressComponent,
    DialogAlertComponent,
  ],
  exports: [
    AllMatCdkModule,
    HeaderComponent,
    ProgressDirective,
    DialogAlertComponent,
  ],
  entryComponents: [
    DataProgressComponent,
    DialogAlertComponent,
  ],
})
export class SharedModule { }
