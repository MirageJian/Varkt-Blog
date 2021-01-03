import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PublicFilesService} from "../services/public-files.service";
import {FileStatModel} from "@const/models";
import {DOMAIN_URL} from "@const/app-const";

@Component({
  templateUrl: './public-files.component.html',
  styleUrls: ['./public-files.component.css']
})
export class PublicFilesComponent implements OnInit {
  tableColumns = ['filename', 'size', 'change_time', 'url'];
  filename: string = null;
  files: FileStatModel[];

  constructor(
    private publicFilesService: PublicFilesService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.publicFilesService.getPublicFiles().subscribe((res: FileStatModel[]) => {
      this.files = res;
    });
  }

  changeFile(event){
    const fileList = event.target.files;
    const file: File = fileList[0];
    let formData = new FormData();
    formData.append('PublicFiles', file, file.name);
    this.filename = file.name;
    this.publicFilesService.uploadFiles(formData).subscribe(() => {
      this.matSnackBar.open(`\'${this.filename}\'Uploaded Successfully`, 'Close', {duration: 5_000});
      this.ngOnInit();
    });
  }

  copyUrl(file: FileStatModel) {
    navigator.clipboard.writeText(DOMAIN_URL + file.url).then();
  }

}
