import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivityInfo} from '../project/activity-info';
import {SummaryWeekModel} from './summary-week-model';

@Component({
  selector: 'app-summary-week',
  templateUrl: './summary-week.component.html',
  styleUrls: ['./summary-week.component.scss']
})
export class SummaryWeekComponent implements OnInit, OnChanges {
  displayedColumns = ['title', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'net'];
  selected = 0;
  weekCount = [];
  @Input() allActivities: Array<ActivityInfo>;
  weeks = Array<Array<SummaryWeekModel>>();

  constructor(
  ) {
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
    let tempActivities = Array<any>();
    activities.forEach(a => {
      if (new Date(a.date).getTime() < new Date(tempDate).getTime()) {
        tempDate = new Date(a.date).getTime() - new Date(a.date).getDay() * (3600000 * 24);
        this.weeks.push(tempActivities);
        tempActivities = Array<any>();
      }
      const ta = tempActivities.find((f: SummaryWeekModel) => f.title === a.title);
      // 取得星期
      const theDay = MyEnum[new Date(a.date).getDay()];
      if (tempActivities.includes(ta)) {// 有直接加
        ta.net += a.net_time;
        ta[theDay] = ta[theDay] ? ta[theDay] + a.net_time : a.net_time;
      } else {// 没有就PUSH
        const obj = {title: a.title, net: a.net_time};
        obj[theDay] = a.net_time;
        tempActivities.push(obj);
      }
    });
    this.weeks.push(tempActivities);
    // 组装周数数组
    this.weekCount = Array.from(this.weeks.keys()).reverse();
    // 选择最后一周
    this.selected = this.weeks.length - 1;
    // 反转周表，把最新周放到最后
    this.weeks.reverse();
  }

  applyFilter(filterValue: string, dataSource) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    dataSource.filter = filterValue;
  }
}
// 枚举类型示例
enum MyEnum {sun, mon, tue, wed, thu, fri, sat}
