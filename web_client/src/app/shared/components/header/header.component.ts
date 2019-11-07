import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
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
  @Input() is_article = false;
  // @Output() changeRoute: EventEmitter<string> = new EventEmitter<string>();
  subscriptionRouter: Subscription;
  backUrl: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // register the subscription of router
    this.subscriptionRouter = this.router.events.pipe(filter((event: any) =>
      event instanceof NavigationEnd)).subscribe(() => {});
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.backUrl = paramMap.get('backUrl');
    })
  }

  goBack() {
    if (this.backUrl) this.router.navigateByUrl(this.backUrl).then();
    else this.router.navigate(['../']).then();
  }

  // destroy the subscription and listener.
  ngOnDestroy() {
    this.subscriptionRouter.unsubscribe();
  }
}
