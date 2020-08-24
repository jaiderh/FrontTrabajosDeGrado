import { MatDialog } from '@angular/material';
import { Injectable, SecurityContext } from '@angular/core';
import { GenericDialogComponent, DialogType } from './generic-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogService {

  showProgressDialog(dialog: MatDialog,
                              title: string,
                              width: string = '300px') {
    const dialogRef = dialog.open( GenericDialogComponent, {
      data: {
        title: title,
        type: DialogType.PROGRESS
      },
      width: width
    });

    return dialogRef;
  }

  showConfirmDialog(dialog: MatDialog,
                              title: string,
                              message: string,
                              width: string = '400px') {
    const dialogRef = dialog.open( GenericDialogComponent, {
      data: {
        title: title,
        type: DialogType.CONFIRM,
        message: message
      },
      width: width
    });

    dialogRef.componentInstance.htmlContent = this.dom.sanitize(SecurityContext.HTML, message);

    return dialogRef;
  }

  showInformationDialog(dialog: MatDialog,
                                    title: string,
                                    message: string,
                                    width: string = '400px',
                                    okLabel: string = null) {
    const dialogRef = dialog.open( GenericDialogComponent, {
      data: {
        title: title,
        message: message,
        type: DialogType.INFORMATION,
        okLabel: okLabel
      },
      width: width
    });

    dialogRef.componentInstance.htmlContent = this.dom.sanitize(SecurityContext.HTML, message);

    return dialogRef;

  }

  constructor(private dom: DomSanitizer) { }
}
