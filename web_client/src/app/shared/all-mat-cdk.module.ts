import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MediaMatcher} from '@angular/cdk/layout';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MarkdownModule} from "ngx-markdown";

/** This module includes all mat, cdk and markdown module.
 * */
@NgModule({
  imports: [
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    // cdk and markdown
    CdkTableModule,
    MarkdownModule.forRoot()
  ],
  exports: [
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    MatButtonToggleModule, MatSlideToggleModule,
    // cdk and markdown
    CdkTableModule,
    MarkdownModule,
  ],
  providers: [
    MediaMatcher,
  ]
})
export class AllMatCdkModule { }
