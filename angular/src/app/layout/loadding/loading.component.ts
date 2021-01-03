import {Component, HostBinding, OnInit} from '@angular/core';
import {loadingAni} from "@const/animations";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [loadingAni]
})
export class LoadingComponent implements OnInit {
  @HostBinding('@loadingAni') hostAnimation = true;

  constructor() { }

  ngOnInit() {
  }
}
