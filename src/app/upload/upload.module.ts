import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../backup/material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialDesignModule,
    FlexLayoutModule
  ],
  declarations: [DialogComponent, FileUploadComponent],
  entryComponents: [
    DialogComponent
  ],
  exports: [FileUploadComponent]
})
export class UploadModule {

  constructor() {}
}
