import {NgModule} from '@angular/core';

import {AdminGuard} from './admin-guard.service';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {ManagingComponent} from './managing/managing.component';
import {SharedModule} from '@shared/shared.module';
import {WritingService} from './services/writing.service';
import {ManagingService} from './services/managing.service';
import {AdminDashboardService} from "./services/admin-dashboard.service";
import {SettingsComponent} from './settings/settings.component';
import {PasswordComponent} from './settings/password/password.component';
import {CategoriesManagingComponent} from './settings/categories-managing/categories-managing.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AboutManagingComponent} from './about-managing/about-managing.component';
import {PublicFilesComponent} from './public-files/public-files.component';
import {PublicFilesService} from "./services/public-files.service";
import {GoMarkdownComponent} from './go-markdown/go-markdown.component';
import {SomethingService} from "../something/something.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {MarkdownEditorComponent} from './makrdown-editor/markdown-editor.component';
import {ArticleService} from "../article/article.service";
import {AboutManagingService} from "./services/about-managing.service";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
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
  entryComponents: [],
  providers: [
    AdminGuard,
    WritingService,
    ManagingService,
    AdminDashboardService,
    PublicFilesService,
    SomethingService,
    ArticleService,
    AboutManagingService,
  ],
  exports: [
    MarkdownEditorComponent
  ]
})
export class AdminModule {
}
