import {Component, OnInit} from '@angular/core';
import {ProjectService} from './project.service';
import {ProjectInfo} from './project-info';
import {ActivityInfo} from './activity-info';
import { MatDialog } from '@angular/material/dialog';
import {DialogProjectComponent} from '../dialog-project/dialog-project.component';
import {DialogActivityComponent} from '../dialog-activity/dialog-activity.component';
import {FormatDate} from '@shared/tools/';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    projectsInfo: Array<ProjectInfo>;
    activitiesInfo: Array<ActivityInfo>;

    constructor(
        private dialog: MatDialog,
        private projectService: ProjectService,
    ) {
    }

    ngOnInit() {
        this.initData();
    }

    initData() {
        this.projectService.getProjects().subscribe((res: ProjectInfo[]) => {
            this.projectsInfo = res;
        });
    }

    opened(id_project: number) {
        this.activitiesInfo = null;
        this.projectService.getActivities(id_project).subscribe((res: ActivityInfo[]) => {
            this.activitiesInfo = res;
        });
    }

    openDialogProject(id: number, type: number): void {
        const dialogRef = this.dialog.open(DialogProjectComponent, {
            width: '400px',
            data: {
                id: id,
                type: type,
            },
        });
        dialogRef.afterClosed().subscribe(() => {
            this.initData();
        });
    }

    openDialogActivity(id: number, id_project: number, type: number): void {
        const dialogRef = this.dialog.open(DialogActivityComponent, {
            width: '400px',
            data: {
                id: id,
                id_project: id_project,
                type: type,
            },
        });
        dialogRef.afterClosed().subscribe(() => {
            this.opened(id_project);
        });
    }

    endActivity(event, a: ActivityInfo): void {
        event.stopPropagation();
        a.time_end = FormatDate.newDatetime();
        a.time_start = a.date + ' ' + a.time_start;
        a.net_time = (new Date(a.time_end).getTime() - new Date(a.time_start).getTime()) / 60000 - (a.interruption ? a.interruption : 0);
      const endTimeObj = {
            id: a.id,
            time_end: a.time_end,
            interruption: a.interruption,
            net_time: a.net_time,
        };
        this.projectService.setEndActivity(endTimeObj).subscribe();
        this.opened(a.id_project);
    }
}


