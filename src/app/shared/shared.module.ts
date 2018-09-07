import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
  MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
  MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';

import { HeaderComponent } from './components/header/header.component';
import { ProgressDirective, DataProgressComponent } from './directives/progress.directive';
import {RouterModule} from "@angular/router";
import {DialogAlertComponent} from "./components/alert-dialog/dialog-alert.component";

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
  ],
  declarations: [
    HeaderComponent,
    ProgressDirective,
    DataProgressComponent,
    DialogAlertComponent
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

    HeaderComponent,
    ProgressDirective,
    DialogAlertComponent
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
