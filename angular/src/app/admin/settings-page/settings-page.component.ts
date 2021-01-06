import {Component} from '@angular/core';
import {slideFromBottom} from "@const/animations";

@Component({
  template: `
    <mat-tab-group [dynamicHeight]="false" [@slideFromBottom]>
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="tab-icon">category</mat-icon>
          Categories
        </ng-template>
        <ng-template matTabContent>
          <app-categories-managing></app-categories-managing>
        </ng-template>
      </mat-tab>
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="tab-icon">vpn_key</mat-icon>
          Password
        </ng-template>
        <ng-template matTabContent>
          <app-password></app-password>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `, styles: [`
    .tab-icon {
      margin-right: 8px;
    }
  `], animations: [slideFromBottom()]
})
export class SettingsPageComponent {

}
