import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule
} from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressDirective, DataProgressComponent } from './directives/progress.directive';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule,
    // cdk
    CdkTableModule,
    FlexLayoutModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProgressDirective,
      DataProgressComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // material-ui
    MatFormFieldModule, MatButtonModule, MatSliderModule, MatMenuModule, MatListModule, MatCardModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule,
    MatInputModule, MatSidenavModule, MatCheckboxModule, MatTabsModule, MatExpansionModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatGridListModule,

    FlexLayoutModule,
    FooterComponent,
    HeaderComponent,
    ProgressDirective
  ],
  providers: [
    MediaMatcher,
  ],
  entryComponents: [
    DataProgressComponent,
  ],
})
export class SharedModule { }
