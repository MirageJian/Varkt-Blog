import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './components/header/header.component';
import {DataProgressComponent, NoDataTipComponent, ProgressDirective} from './directives/progress.directive';
import {DialogAlertComponent} from './components/alert-dialog/dialog-alert.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CdkTableModule} from '@angular/cdk/table';
import {MarkdownModule} from 'ngx-markdown';
import {MediaMatcher} from '@angular/cdk/layout';
import {FullWidthDirective, IconMarginDirective, NoPaddingDirective} from './directives/styles.directive';
import { FileSizePipe } from './pipes/file-size-unit.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    // Material Ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    MatSlideToggleModule,
    // CDK and markdown
    CdkTableModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    ProgressDirective,
    // Components
    DataProgressComponent,
    NoDataTipComponent,
    DialogAlertComponent,
    // Styles directives
    FullWidthDirective,
    NoPaddingDirective,
    IconMarginDirective,
    FileSizePipe,
  ],
  exports: [
    HeaderComponent,
    ProgressDirective,
    DialogAlertComponent,
    // Material Ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    MatSlideToggleModule,
    // CDK and markdown
    CdkTableModule,
    MarkdownModule, FullWidthDirective, NoPaddingDirective, FileSizePipe
  ],
  providers: [
    MediaMatcher,
  ],
  entryComponents: [
    DataProgressComponent,
    DialogAlertComponent,
  ],
})
export class SharedModule { }
