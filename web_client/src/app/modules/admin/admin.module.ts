import {NgModule} from '@angular/core';

import {AdminGuard} from './admin-guard.service';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {ManagingComponent} from './managing/managing.component';
import {SharedModule} from '@shared/shared.module';
import {WritingService} from './go-markdown/writing.service';
import {ManagingService} from './managing/managing.service';
import {AdminDashboardService} from "./admin-dashboard/admin-dashboard.service";
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './settings/password/password.component';
import { CategoriesManagingComponent } from './settings/categories-managing/categories-managing.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AboutManagingComponent } from './about-managing/about-managing.component';
import { PublicFilesComponent } from './public-files/public-files.component';
import {PublicFilesService} from "./public-files/public-files.service";
import { GoMarkdownComponent } from './go-markdown/go-markdown.component';
import {SomethingService} from "../something/something.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import { MarkdownEditorComponent } from './components/makrdown-editor/markdown-editor.component';
import {ArticleService} from "../article/article.service";

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManagingComponent,
    SettingsComponent,
    PasswordComponent,
    CategoriesManagingComponent,
    AboutManagingComponent,
    PublicFilesComponent,
    GoMarkdownComponent,
    MarkdownEditorComponent,
  ],
  entryComponents: [
  ],
  providers: [
    AdminGuard,
    WritingService,
    ManagingService,
    AdminDashboardService,
    PublicFilesService,
    SomethingService,
    ArticleService
  ],
})
export class AdminModule {
}
