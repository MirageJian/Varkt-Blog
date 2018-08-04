import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProjectService} from '../project/project.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormatDate} from '../../../../shared/tools/format-date';

@Component({
    selector: 'app-dialog-project',
    templateUrl: './dialog-project.component.html',
    styleUrls: ['./dialog-project.component.scss']
})
export class DialogProjectComponent implements OnInit {
    theForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<DialogProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private projectService: ProjectService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.theForm = this.fb.group({
            id: this.data.id,
            theme: [null, Validators.required],
            date_start: [new Date().toISOString(), Validators.required],
            date_end: null,
            remark: null,
        });
        if (this.data.id !== 0) {
            this.projectService.getProject(this.data.id).subscribe(res => this.theForm.patchValue(res));
        }
    }
    onSubmit() {
        this.theForm.patchValue({
            date_start: FormatDate.hansDatetime(this.theForm.value.date_start),
            date_end: FormatDate.hansDatetime(this.theForm.value.date_end),
        });
        if (this.data.type === 1) {
            this.projectService.putProject(this.theForm.value).subscribe(res => {});
        } else {
            this.projectService.postProject(this.theForm.value).subscribe(res => {});
        }
        this.dialogRef.close();
    }
    deleteProject(): void {
        this.projectService.deleteProject(this.data.id).subscribe();
        this.dialogRef.close();
    }
}
