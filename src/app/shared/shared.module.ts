import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
  MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
  MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule, MatDialogModule
} from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './components/header/header.component';
import { ProgressDirective, DataProgressComponent } from './directives/progress.directive';
import {RouterModule} from "@angular/router";
import {DialogDataExampleDialogComponent} from "./components/alert-dialog/alert-dialog.component";

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
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule,
    // cdk
    CdkTableModule,
    FlexLayoutModule,
  ],
  declarations: [
    HeaderComponent,
    ProgressDirective,
    DataProgressComponent,
    DialogDataExampleDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule, MatDialogModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule,

    FlexLayoutModule,
    HeaderComponent,
    ProgressDirective,
    DialogDataExampleDialogComponent
  ],
  providers: [
    MediaMatcher,
  ],
  entryComponents: [
    DataProgressComponent,
    DialogDataExampleDialogComponent,
  ],
})
export class SharedModule { }
