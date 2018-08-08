import { NgModule } from '@angular/core';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import { ErrorPageComponent } from './error-page/error-page.component';
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutRouting,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    ErrorPageComponent,
  ]
})
export class LayoutModule { }
