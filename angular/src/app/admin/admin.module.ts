import {NgModule} from '@angular/core';

import {AdminGuard} from './admin-guard.service';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {ManagingComponent} from './managing/managing.component';
import {SharedModule} from '@shared/shared.module';
import {WritingManagingService} from './services/writing-managing.service';
import {AdminDashboardService} from "./services/admin-dashboard.service";
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {PasswordComponent} from './settings-page/password/password.component';
import {CategoriesManagingComponent} from './settings-page/categories-managing/categories-managing.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AboutManagingComponent} from './about-managing/about-managing.component';
import {PublicFilesComponent} from './public-files/public-files.component';
import {PublicFilesService} from "./services/public-files.service";
import {GoMarkdownComponent} from './go-markdown/go-markdown.component';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {MarkdownEditorComponent} from './go-markdown/makrdown-editor/markdown-editor.component';
import {AboutManagingService} from "./services/about-managing.service";
import {CommonModule} from "@angular/common";
import {SomethingManagingService} from "./services/something-managing.service";
import {FileUploadService} from "./services/file-upload.service";

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
    SettingsPageComponent,
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
    FileUploadService,
    WritingManagingService,
    AdminDashboardService,
    PublicFilesService,
    AboutManagingService,
    SomethingManagingService
  ],
  exports: [
    MarkdownEditorComponent
  ]
})
export class AdminModule {
}
