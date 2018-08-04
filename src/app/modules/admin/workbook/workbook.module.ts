import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeekBookComponent} from './week-book/week-book.component';
import {DialogProjectComponent} from './dialog-project/dialog-project.component';
import {WorkbookComponent} from './workbook.component';
import {ProjectComponent} from './project/project.component';
import {DialogActivityComponent} from './dialog-activity/dialog-activity.component';
import {AdminDashboardComponent} from '../admin-dashboard/admin-dashboard.component';
import {SharedModule} from '../../../shared/shared.module';
import {ProjectService} from './project/project.service';
import { SummaryWeekComponent } from './summary-week/summary-week.component';
import { EstimationWeekComponent } from './estimation-week/estimation-week.component';

@NgModule({
  imports: [
    CommonModule,
      SharedModule,
  ],
  declarations: [
      WorkbookComponent,
      AdminDashboardComponent,
      ProjectComponent,
      DialogProjectComponent,
      DialogActivityComponent,
      WeekBookComponent,
      SummaryWeekComponent,
      EstimationWeekComponent,
  ],
  entryComponents: [
      DialogProjectComponent,
      DialogActivityComponent

  ],
  providers: [
      ProjectService,
  ]
})
export class WorkbookModule { }
