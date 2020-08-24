import { Component, OnInit, ViewChild, ElementRef, Input, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from '../upload.service';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {
  private dialog: MatDialog;

  progress: Observable<Number>;
  response: Observable<HttpResponse<any>>;

  canBeClosed = true;
  primaryButtonText = 'Cargar Archivos';
  showCancelButton = true;
  uploadSuccessful = false;

  private files: Array<File>;
  private url: string;
  private data: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              public uploadService: UploadService,
              @Inject(MAT_DIALOG_DATA) data: any) {
    this.files = data.files as Array<File>;
    this.url = data.url;
    this.data = data.data;
  }

  uploadFiles() {

    // start the upload and save the progress map
    Object.assign( this, this.uploadService.upload(this.files, this.data));

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When response-observable is completed...
    this.response.subscribe( response => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // close and return the body response
      this.dialogRef.close( response.body );
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.uploadFiles();
  }

}
