import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {ActivityInfo} from '../project/activity-info';

@Component({
  selector: 'app-week-book',
  templateUrl: './week-book.component.html',
  styleUrls: ['./week-book.component.scss']
})
export class WeekBookComponent implements OnInit, OnChanges {
  selected: number;
  displayedColumns = ['id', 'project', 'title', 'date', 'interruption', 'net_time'];
  @Input() allActivities: Array<ActivityInfo>;

  weeks = Array<Array<ActivityInfo>>();
  weeksNum: Array<number>;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.allActivities.length !== 0) {
      this.weeks = [];
      this.constructWeeks(this.allActivities);
    }
  }

  constructWeeks(activities: Array<ActivityInfo>) {
    let tempDate = new Date(activities[0].date).getTime() - new Date(activities[0].date).getDay() * 3600000 * 24;
    let tempActivity = Array<ActivityInfo>();
    activities.forEach(a => {
      if (new Date(a.date).getTime() < new Date(tempDate).getTime()) {
        tempDate = new Date(a.date).getTime() - new Date(a.date).getDay() * (3600000 * 24);
        this.weeks.push(tempActivity);
        tempActivity = Array<ActivityInfo>();
      }
      tempActivity.push(a);
    });
    this.weeks.push(tempActivity);
    this.weeks = this.weeks.reverse();
    this.selected = this.weeks.length - 1;
    this.weeksNum = Array.from(Array(this.weeks.length), (item, index) => this.selected - index);
  }

  applyFilter(filterValue: string, dataSource) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    dataSource.filter = filterValue;
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
