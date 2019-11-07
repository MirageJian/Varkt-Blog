import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivityInfo} from '../project/activity-info';
import {SummaryWeekModel} from '../summary-week/summary-week-model';
import {ProjectService} from '../project/project.service';

@Component({
  selector: 'app-estimation-week',
  templateUrl: './estimation-week.component.html',
  styleUrls: ['./estimation-week.component.scss']
})
export class EstimationWeekComponent implements OnInit, OnChanges {
  displayedColumns = ['title', 'all', 'ave', 'max', 'min'];
  selected = 0;
  weekCount = [];
  @Input() allActivities: Array<ActivityInfo>;
  @Input() plus: number;
  estimations = Array<Array<any>>();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.allActivities.length !== 0) {
      this.estimations = [];
      this.constructWeeks(this.allActivities);
    }
  }
  constructWeeks(activities: Array<ActivityInfo>) {
    let weeks = Array<Array<ActivityInfo>>();
    let tempDate = new Date(activities[0].date).getTime() - new Date(activities[0].date).getDay() * 3600000 * 24;
    let tempActivity = Array<ActivityInfo>();
    activities.forEach(a => {
      if (new Date(a.date).getTime() < new Date(tempDate).getTime()) {
        tempDate = new Date(a.date).getTime() - new Date(a.date).getDay() * (3600000 * 24);
        weeks.push(tempActivity);
        tempActivity = Array<ActivityInfo>();
      } else {
        tempActivity.push(a);
      }});
    weeks.push(tempActivity);
    weeks = weeks.reverse();
    if (this.plus) {
      weeks.pop();
    }
    this.constructEstimations(weeks);
  }

  constructEstimations(weeks: Array<Array<ActivityInfo>>) {
    for (const allw of [...weeks]) {
      const e = Array<any>();
      for (const w of weeks) {
        for (const a of w) {
          if (allw.findIndex(f => f.title === a.title) !== -1) {
            if (e.findIndex(f => f.title === a.title) !== -1) {
              const t = e.find(f => f.title === a.title);
              t.all += (a.net_time ? a.net_time : 0);
              t.count++;
              t.ave = t.all / t.count;
              t.max = (a.net_time > t.max) ? a.net_time : t.max;
              t.min = (a.net_time < t.min) ? a.net_time : t.min;
            } else {
              e.push({
                title: a.title,
                all: a.net_time ? a.net_time : 0,
                count: 1,
                ave: a.net_time ? a.net_time : 0,
                max: a.net_time ? a.net_time : 0,
                min: a.net_time ? a.net_time : 0,
              });
            }
          }
        }
      }
      this.estimations.push(e);
    }
    this.weekCount = Array.from(weeks.keys()).reverse();
    this.selected = this.weekCount.length - 1;
  }

  applyFilter(filterValue: string, dataSource) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    dataSource.filter = filterValue;
  }


}
