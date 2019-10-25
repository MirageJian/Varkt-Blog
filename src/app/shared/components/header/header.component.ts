import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {slideFromRight} from "../../animations/animations";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideFromRight]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() sidenav: MatSidenav;
  @Input() matches: boolean;
  @Input() is_article: false;
  // @Output() changeRoute: EventEmitter<string> = new EventEmitter<string>();
  subscriptionRouter: Subscription;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    // register the subscription of router
    this.subscriptionRouter = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {

      });
  }

  // destroy the subscription and listener.
  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
  }
}
