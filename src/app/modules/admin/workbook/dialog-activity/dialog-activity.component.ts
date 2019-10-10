import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DialogProjectComponent} from '../dialog-project/dialog-project.component';
import {ProjectService} from '../project/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormatDate} from '../../../../shared/tools/';

@Component({
  selector: 'app-dialog-activity',
  templateUrl: './dialog-activity.component.html',
  styleUrls: ['./dialog-activity.component.scss']
})
export class DialogActivityComponent implements OnInit {
    theForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DialogProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private projectService: ProjectService,
    ) {}
    ngOnInit() {
        this.theForm = this.fb.group({
            id: this.data.id,
            id_project: this.data.id_project,
            title: [null, Validators.required ],
            date: [new Date().toISOString(), Validators.required],
            time_start: [FormatDate.newTime(), Validators.required],
            time_end: null,
            interruption: null,
            net_time: null,
            num_week: null,
            remark: null,
        });
        if (this.data.id !== 0) {
            this.projectService.getActivity(this.data.id).subscribe(res => this.theForm.patchValue(res));
        }
    }
    onSubmit() {
        this.theForm.patchValue({
            date: FormatDate.hansDatetime(this.theForm.value.date),
        });
        if (this.data.type === 1) {
            this.projectService.putActivity(this.theForm.value).subscribe(res => {});
        } else {
            this.projectService.postActivity(this.theForm.value).subscribe(res => {});
        }
        this.dialogRef.close();
    }
    deleteActivity(): void {
        this.projectService.deleteActivity(this.data.id).subscribe();
        this.dialogRef.close();
    }
}
