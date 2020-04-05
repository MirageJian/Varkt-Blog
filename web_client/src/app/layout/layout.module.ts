import {APP_INITIALIZER, NgModule} from '@angular/core';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {SharedModule} from "@shared/shared.module";
import { LoadingComponent } from './loadding/loading.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRouting,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,

    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
  ]
})
export class LayoutModule {}
