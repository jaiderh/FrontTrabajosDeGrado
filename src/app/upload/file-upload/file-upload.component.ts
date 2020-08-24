import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { UploadService } from '../upload.service';
import { MatDialog, MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  disabled: boolean;

  BYTES_PER_MB = 1024 * 1024;

  @ViewChild('file') file: ElementRef;
  @Input() maxFileNumber = 1;
  @Input() maxFileSizeMB = 1;
  @Input() data: any;
  @Input() progressMode: ProgressMode = ProgressMode.SPINNER;
  @Input() spinnerDiameter = 60;

  ProgressMode: any = ProgressMode;

  // public files: Set<File> = new Set();
  public files: Array<File> = [];

  private responseSubject: Subject<any>;

  constructor(public dialog: MatDialog,
              public uploadService: UploadService) { }

  get loading(): Observable<boolean> { return this.uploadService.loading; }

  ngOnInit() {
  }

  addFiles(): Observable<any> {
    this.file.nativeElement.click();
    this.responseSubject = new Subject();
    return this.responseSubject.asObservable();
  }

  onFilesAdded() {
    debugger
    if ( this.file.nativeElement.files.length > this.maxFileNumber ) {
      this.responseSubject.error(`El número de arhivos supera la cantidad máxima de ${this.maxFileNumber} archivo(s) permitidos`);
      return;
    }

    const fileList = [];
    const files: { [key: string]: File } = this.file.nativeElement.files;

    // tslint:disable-next-line:prefer-const
    for (let key in files) {
      // tslint:disable-next-line:radix
      if ( !(isNaN(parseInt(key)) ) ) {
        const fileSizeMB = Math.round( files[key].size / this.BYTES_PER_MB );
        if ( fileSizeMB > this.maxFileSizeMB ) {
          this.responseSubject.error(
            `El archivo '${files[key].name}' de ${fileSizeMB}MB excede los ${this.maxFileSizeMB}MB permitidos por archivo`
          );
          return;
        }
        fileList.push(files[key]);
      }
    }

    this.startUpload(fileList);
  }

  startUpload(files) {
    if (this.progressMode === ProgressMode.PROGRESS_BAR_DIALOG) {
      this.openUploadDialog();
    } else {
      const { response: resp } = this.uploadService.upload(files, this.data);
      resp.subscribe( response => this.setUploadResponse( response.body ) );
    }
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(
        DialogComponent,
        {
          width: '50%',
          height: '50%',
          data: { files: this.files, data: this.data }
        }).afterClosed().subscribe( response =>  this.setUploadResponse(response) );
  }

  setUploadResponse(response: any) {
    if ( response && response.Result) {
      this.files = response.Result.FileList;
      this.onChange(this.files);
    }

    this.responseSubject.next(response);
    this.responseSubject.complete();
  }

  deleteFile(fileId: number, uploadKey: string): Observable<any> {
    return this.uploadService.delete(fileId, uploadKey)
                .pipe(
                  tap( resp => {
                    if ( resp.Success ) {
                      this.files = resp.Result;
                      this.onChange(this.files);
                    }
                  })
                );
  }

  onChange = (selected: Array<any>) => {};
  onTouched = () => {};

  get value(): Array<any> { return this.files; }
  set value(files: Array<any>) {
    if (files !== this.files) {
      this.files = files;
      this.onChange(files);
    }
  }

  writeValue(files: Array<any>): void {
    this.files = files;
  }

  registerOnChange(fn: (files: Array<any>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

export enum ProgressMode {
  SPINNER = 'SPINNER',
  PROGRESS_BAR_DIALOG = 'PROGRESS BAR DIALOG'
}
