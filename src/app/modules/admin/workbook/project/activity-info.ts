import {NativeDateAdapter} from '@angular/material';
import {FormControl} from '@angular/forms';

export class ActivityInfo {
    id: number;
    id_project: number;
    project: string;
    title: string;
    date: string;
    time_start: string;
    time_end: string;
    interruption: number;
    net_time: number;
    num_week: number;
    remark: string;
}
