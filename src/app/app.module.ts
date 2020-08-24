import { UploadModule } from './upload/upload.module';
import { NotificationService } from './shared/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialDesignModule } from './material-design.module';
import { RequestService } from './requests/request.service';
import { RequestListComponent } from './requests/request-list.component';
import { TableFilterComponent } from './utils/table-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from './shared/base.service';

import { CKEditorModule } from 'ng2-ckeditor';
import { CouncilService } from './council-sessions/council.service';
import { CouncilListComponent } from './council-sessions/council-list.component';
import { CouncilDetailComponent } from './council-sessions/council-detail.component';
import { CouncilDetailResolver } from './council-sessions/council-detail-resolver.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { APP_CONFIG, AppConfig } from './app.config';
import { DegreeProjectTimelineComponent } from './degree-projects/degree-project-timeline.component';
import { DegreeProjectListComponent } from './degree-projects/degree-project-list.component';
import { settingsProviderFactory, SharedService } from './shared/shared.service';
import { BreadcrumbComponent } from './shared/layout/breadcrumb/breadcrumb.component';
import { HeaderContentComponent } from './shared/layout/header-content/header-content.component';
import { RequestDetailDialogComponent } from './requests/request-detail-dialog/request-detail-dialog.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderInterceptor } from './shared/loader/loader-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SlidePanelComponent } from './shared/slide-panel/slide-panel.component';

import { StorageServiceModule } from 'angular-webstorage-service';
import { RequestDetailComponent } from './requests/request-detail.component';
import { NumbersOnlyDirective } from 'src/app/shared/numbers-only.directive';
import { RequestPrivacyPolicyComponent } from './requests/request-privacy-policy/request-privacy-policy.component';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { TemplateDetailComponent } from './templates/template-detail.component';
import { EventProjectComponent } from './event-project/event-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';


import { VerticalTimelineElementComponent } from './vertical-timeline-element/vertical-timeline-element.component';
import { VerticalTimeLineComponent } from './vertical-timeline-element/vertical-time-line.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
    TableFilterComponent,
    CouncilListComponent,
    CouncilDetailComponent,
    DegreeProjectTimelineComponent,
    DegreeProjectListComponent,
    BreadcrumbComponent,
    HeaderContentComponent,
    RequestDetailDialogComponent,
    LoaderComponent,
    DashboardComponent,
    SlidePanelComponent,
    RequestDetailComponent,
    NumbersOnlyDirective,
    RequestPrivacyPolicyComponent,
    GenericDialogComponent,
    TemplateDetailComponent,
    EventProjectComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    VerticalTimelineElementComponent,
    VerticalTimeLineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialDesignModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxChartsModule,
    StorageServiceModule,
    UploadModule
  ],
  entryComponents: [
    RequestDetailDialogComponent,
    RequestPrivacyPolicyComponent,
    GenericDialogComponent
  ],
  providers: [CouncilService , RequestService, CouncilDetailResolver, SharedService, LoaderService, NotificationService,
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
                { provide: APP_INITIALIZER, useFactory: settingsProviderFactory, deps: [SharedService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
