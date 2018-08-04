import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openRecordWeb() {
    window.open('http://www.miitbeian.gov.cn/');
  }

  openAbout() {
  }
}
