import {Component, OnInit} from '@angular/core';
import {ActivityInfo} from './project/activity-info';
import {ProjectService} from './project/project.service';
import {SummaryWeekModel} from './summary-week/summary-week-model';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.scss']
})
export class WorkbookComponent implements OnInit {
  all = Array<ActivityInfo>();

  constructor(
    private projectService: ProjectService,
  ) {
  }

  ngOnInit() {
  }

  getAllActivities() {
    this.projectService.getAllActivities().subscribe((res: ActivityInfo[]) => {
      this.all = res;
    });
  }

  onTabChange() {
    this.getAllActivities();
  }
}
