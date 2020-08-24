import { NgForm } from '@angular/forms';
import { NotificationService } from './../shared/notification.service';
import { TemplateService } from './template.service';
import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Template } from './template';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoaderType } from './../shared/loader/loader.component';
import { GenericDialogService } from '../generic-dialog/generic-dialog.service';
import { MatDialog } from '@angular/material';
import { DialogResponse } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  template: Template;
  LoaderType: any = LoaderType;
  formDisabled = false;

  @ViewChild('templateForm') templateForm: NgForm;

  constructor(private matDialog: MatDialog,
              private templateService: TemplateService,
              @Inject(APP_CONFIG) private config: IAppConfig,
              route: ActivatedRoute,
              private notificationService: NotificationService,
              private dialogService: GenericDialogService ) {
    this.subscription = route.data.subscribe( result => this.template = result['template'] );

  }

  get editorConfig(): any { return this.config.ckeditor_settings; }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveTemplate() {
    if ( this.templateForm.dirty) {

      const dialogRef = this.dialogService.showConfirmDialog(this.matDialog, 'Edición de Plantillas'
                                                , 'Está seguro de guardar los cambios realizados sobre la plantilla ?', '600px');

      dialogRef.afterClosed().subscribe( (result: DialogResponse) => {
        if ( result === DialogResponse.YES ) {
          this.templateService.save( this.template ).subscribe( resp => this.notificationService.showInformation(resp) );
        }
      });
    }
  }

}
