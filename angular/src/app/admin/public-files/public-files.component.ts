import {Component, HostBinding, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PublicFilesService} from "../services/public-files.service";
import {FileStatModel} from "@const/models";
import {DOMAIN_URL} from "@const/app-const";
import {Observable} from "rxjs";
import {slideFromBottom} from "@const/animations";

@Component({
  templateUrl: './public-files.component.html',
  styleUrls: ['./public-files.component.css'],
  animations: [slideFromBottom()]
})
export class PublicFilesComponent implements OnInit {
  @HostBinding('@slideFromBottom')
  tableColumns = ['filename', 'size', 'change_time', 'url'];
  files: Observable<FileStatModel[]>;

  constructor(
    private publicFilesService: PublicFilesService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.files = this.publicFilesService.getPublicFiles();
  }

  uploadFile(event){
    const fileList = event.target.files;
    const file: File = fileList[0];
    let formData = new FormData();
    formData.append('PublicFiles', file, file.name);
    this.publicFilesService.uploadFiles(formData).subscribe(() => {
      (event.target as HTMLInputElement).value = null;
      this.matSnackBar.open(`\'${file.name}\'Uploaded Successfully`, 'Close', {duration: 5_000});
      this.ngOnInit();
    });
  }

  deleteFile(file: FileStatModel) {
    this.publicFilesService.deletePublicFile(file.filename).subscribe(() => {
      this.matSnackBar.open(`${file.filename} has been deleted`, 'Close', {duration: 5_000});
      this.ngOnInit();
    });
  }

  copyUrl(file: FileStatModel) {
    navigator.clipboard.writeText(DOMAIN_URL + file.url).then();
  }
}
