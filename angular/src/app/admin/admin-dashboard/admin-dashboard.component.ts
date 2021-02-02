import {Component, OnInit} from '@angular/core';
import {CommentModel} from "@const/models";
import {AdminDashboardService} from "../services/admin-dashboard.service";

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  comments: CommentModel[];

  constructor(
    private adminDashboardService: AdminDashboardService,
  ) { }

  ngOnInit() {
    this.adminDashboardService.getCommentUnchecked().subscribe((res: CommentModel[]) => {
      this.comments = res.length ? res : [{content: 'no new comment'} as CommentModel];
    })
  }

  checkComment(id: number) {
    this.adminDashboardService.checkComment(id).subscribe(() => {
      this.comments[this.comments.findIndex(ff => ff.id === id)].isChecked = true;
    })
  }
}
