import { RelatedRequest } from './../../models/request';
import { Response } from './../../models/response';
import { Component, OnInit, Inject } from '@angular/core';
import { IRequest, IRequestDetail } from '../../models/request';
import { RequestType, BasicData } from '../../models/initial-settings';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SharedService } from '../../shared/shared.service';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { RequestService } from '../request.service';
import { Notification, NotificationService, Notification_Type } from '../../shared/notification.service';
import { QueryParams, FilterParam } from '../../models/query-params';

@Component({
  templateUrl: './request-detail-dialog.component.html',
  styleUrls: ['./request-detail-dialog.component.css']
})
export class RequestDetailDialogComponent implements OnInit {

  request: IRequestDetail;
  formDisabled: boolean;
  response: Response;
  editable: boolean;
  requestTypes: Array<RequestType>;
  programs: Array<BasicData>;
  faculties: Array<BasicData>;
  branches: Array<BasicData>;
  requestStates: Array<BasicData>;
  selectedRequestType: RequestType = null;
  editorConfig: any;
  selectedApplicant: any;

  isLeftVisible = true;

  relatedRequest: Array<RelatedRequest>;

  constructor(
      private dialogRef: MatDialogRef<RequestDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data,
      public sharedService: SharedService,
      private requestService: RequestService,
      @Inject(APP_CONFIG) private config: IAppConfig,
      private notificationService: NotificationService) {

    this.request = <IRequestDetail> data.request;
    this.formDisabled = <boolean> data.formDisabled;
    this.requestTypes = sharedService.settings.RequestTypes;
    this.programs = sharedService.settings.Programs;
    this.faculties = sharedService.settings.Faculties;
    this.branches = sharedService.settings.Branches;
    this.requestStates = this.config.RequestStates;

    this.editorConfig = { removePlugins: 'toolbar', allowedContent: true, readOnly: true, width: '100%', extraPlugins: 'autogrow' } ;

    console.log(this.editorConfig);
  }

  downloadFile(fileName: string ) {
    this.sharedService.downloadRequestFile(this.request.Id, fileName);
  }

  fileIconName(fileName: string): string {
    return this.sharedService.getFileIconName(fileName);
  }

  respond(): void {
    this.response = new Response( this.request.Id, this.request.State, this.request.Observations, this.request.RequestTypeId );
    this.requestService.respond( this.response ).subscribe (
      (resp) => {
        this.dialogRef.close( this.response );
        this.notificationService.show( { message: <string>resp, type: Notification_Type.INFORMATION  } );
      });
  }

  onViewApplicantRequests(applicant: any) {
    // const queryParams = new QueryParams();
    // queryParams.FilterBy.push( new FilterParam( 'Solicitantes.SolicitanteId', '=', applicant.Id ) );

    this.requestService.getApplicantRelatedRequests( applicant.ApplicantId, this.request.Id ).subscribe( result => {
      this.relatedRequest = result;
      this.selectedApplicant = applicant;
      this.isLeftVisible = false;
    });
  }

  onCloseRelatedRequests() {
    this.relatedRequest = [];
    this.isLeftVisible = true;
  }

  ngOnInit() {
  }

}
