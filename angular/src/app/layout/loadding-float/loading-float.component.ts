import {Component, HostBinding, OnInit} from '@angular/core';
import {loadingAni} from '@const/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-float.component.html',
  styleUrls: ['./loading-float.component.css'],
  animations: [loadingAni]
})
export class LoadingFloatComponent implements OnInit {
  @HostBinding('@loadingAni') hostAnimation = true;

  constructor() { }

  ngOnInit() {
  }
}
