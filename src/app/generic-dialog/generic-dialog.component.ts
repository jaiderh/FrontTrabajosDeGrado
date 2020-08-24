import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  message: string;
  noLabel: string;
  progressSpinnerDiameter: number;
  okLabel: string;
  title: string;
  type: DialogType;
  yesLabel: string;

  DialogResponse: any = DialogResponse;

  DialogType: any = DialogType;

  htmlContent: SafeHtml;

  constructor(public dialogRef: MatDialogRef<GenericDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.title = data.title;
    this.type = data.type;
    this.message = data.message;
    this.okLabel = data.okLabel || 'OK';
    this.yesLabel = data.yesLabel || 'SI';
    this.noLabel = data.noLabel || 'NO';
    this.progressSpinnerDiameter = data.progressSpinnerDiameter || 80;
    this.dialogRef.disableClose = this.type === DialogType.PROGRESS;
  }

  ngOnInit() {
  }

  close(result: DialogResponse) {
    this.dialogRef.close(result);
  }
}

export enum DialogType {
  INFORMATION,
  CONFIRM,
  PROGRESS
}

export enum DialogResponse {
  NO, YES, OK
}
