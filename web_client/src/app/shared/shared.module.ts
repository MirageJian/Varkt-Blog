import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';

import { HeaderComponent } from './components/header/header.component';
import { ProgressDirective, DataProgressComponent } from './directives/progress.directive';
import {RouterModule} from "@angular/router";
import {DialogAlertComponent} from "./components/alert-dialog/dialog-alert.component";
import { EditorComponent } from './components/editor/editor.component';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    // cdk
    CdkTableModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    ProgressDirective,
    DataProgressComponent,
    DialogAlertComponent,
    EditorComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatSnackBarModule,
    // cdk
    CdkTableModule,
    MarkdownModule,

    HeaderComponent,
    ProgressDirective,
    DialogAlertComponent,
    EditorComponent
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
