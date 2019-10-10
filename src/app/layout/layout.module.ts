import { NgModule } from '@angular/core';
import {LayoutRouting} from "./layout.routing";
import {LayoutComponent} from "./layout.component";
import {NavbarComponent} from "./navbar/navbar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
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
    MatSnackBarModule,
  ],
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    ErrorPageComponent,
  ]
})
export class LayoutModule { }
