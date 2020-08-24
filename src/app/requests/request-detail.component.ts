import { GenericDialogService } from './../generic-dialog/generic-dialog.service';
import { RequestPrivacyPolicyComponent } from './request-privacy-policy/request-privacy-policy.component';

import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChildren, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormArray, NgForm } from '@angular/forms';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { SharedService } from '../shared/shared.service';
import { RequestType, BasicData } from '../models/initial-settings';
import { GenericValidator } from '../shared/generic-validator';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { IRequestDetail, ApplicantDetail } from '../models/request';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { MatTab, MatTabGroup, MatDialog } from '@angular/material';
import { FileUploadComponent } from '../upload/file-upload/file-upload.component';
import { environment } from '../../environments/environment';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';
import { Subscription } from 'rxjs';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  loadingSubscription: Subscription;
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  @ViewChild(NgForm) requestForm: NgForm;
  @ViewChild(FileUploadComponent) uploader: FileUploadComponent;

  formDisabled: boolean;
  request: IRequestDetail;
  selectedRequestType: RequestType;

  studentApplicantType: BasicData;

  title: string;

  uploadKeyExpiration: string;

  editorConfig: any;

  MAX_REQUEST_APPLICANTS = 5;
  MAX_FILE_COUNT = 5;
  uploadData: any = {};

  constructor(public sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(APP_CONFIG) private config: IAppConfig,
              @Inject(SESSION_STORAGE) private storage: StorageService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private genericDialogService: GenericDialogService,
              private requestService: RequestService) {

    this.editorConfig = config.ckeditor_settings;
    this.editorConfig.height = '200';

    this.studentApplicantType = this.ApplicantTypes.find( item => item.Name === 'Estudiante' );
    this.onRequestRetrieved(  this.route.snapshot.data['request'] );
  }

  get ApplicantTypes(): BasicData[] { return this.config.ApplicantTypes; }
  get Branches(): BasicData[] { return this.sharedService.settings.Branches; }
  get Faculties(): BasicData[] { return this.sharedService.settings.Faculties; }
  get Programs(): BasicData[] { return this.sharedService.settings.Programs; }
  get RequestTypes(): RequestType[] { return this.sharedService.settings.RequestTypes; }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadingSubscription = this.uploader.loading.subscribe( state => this.formDisabled = state );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  fileIconName(fileName: string): string {
    return this.sharedService.getFileIconName(fileName);
  }

  onRemoveFile(fileId: number, index: number) {
    this.uploader.deleteFile( fileId, this.request.UploadKey ).subscribe( resp => {
        if (resp.Success) {
          this.request.Files.splice(index, 1);
          this.sharedService.setTemporaryFileList(this.request.UploadKey , this.request.Files, this.uploadKeyExpiration);
        }
      });
  }

  onViewPrivacyPolicy() {
    this.dialog.open(RequestPrivacyPolicyComponent, { width: '75%' });
  }

  onRequestRetrieved(request: IRequestDetail): void {
    this.request = request;

    if ( this.request.Id > 0 ) {
      this.formDisabled = true;
      this.title =  `Solicitud ${request.Code}`;
      this.request.FacultyId = this.request.FacultyId;
      this.editorConfig.readOnly = true;
    } else {
      this.title =  `Nueva Solicitud`;
      this.request.FacultyId = this.Faculties[0].Id;
      this.request.UploadKey = this.storage.get('uploadKey') || '';

      if (this.request.UploadKey) {
        this.request.Files = this.storage.get('tempFileList');
        this.uploadKeyExpiration = this.storage.get('uploadKey-expiration');
      }
      this.uploadData = { type: 'TEMPFILE', uploadkey: this.request.UploadKey };
      this.editorConfig.readOnly = false;
    }

    this.onRequestTypeChange(this.request.RequestTypeId);
  }

  onRequestTypeChange(newId: number) {
    if (newId) {
      this.selectedRequestType = this.RequestTypes.find( reqType => reqType.Id === newId );

      if ( !this.selectedRequestType.RequiresDetail ) {
        this.request.RequestTypeDetail = '';
      }
    }
  }

  onFileUpload() {
    this.uploader.addFiles().subscribe(
      (response: any) => {
        if (response && response.Result) {
          const result = response.Result;
          const expireDate = result.ExpireDate;

          this.request.Files = result.FileList;
          this.request.UploadKey = result.Uploadkey;
          this.uploadData.uploadkey = result.Uploadkey;

          this.sharedService.setTemporaryFileList(result.Uploadkey, result.FileList, expireDate);
        }
      },
      error => this.notificationService.showError( error )
    );
  }

  addAplicant() {
    this.request.Applicants.push( new ApplicantDetail() );
    this.matTabGroup.selectedIndex = this.request.Applicants.length - 1;
  }

  removeApplicant(index: number) {
    this.request.Applicants.splice(index, 1);
  }

  onSubmit(formRef) {
    if (!formRef.valid) {
      this.genericDialogService.showInformationDialog(this.dialog, 'Nueva Solicitud',
         'Complete por favor la información requerida para registrar su solicitud', '600px');
      return;
    }

    if (!this.request.Files.length) {
      this.genericDialogService.showInformationDialog(this.dialog, 'Nueva Solicitud',
         'Debe anexar por lo menos un archivo con su solicitud.', '600px');
      return;
    }

    const dialogRef = this.genericDialogService.showProgressDialog(this.dialog, 'Procesando su solicitud');

    this.requestService.save( this.request ).subscribe( response => {
      dialogRef.close();
      this.genericDialogService.showInformationDialog(this.dialog, 'Nueva Solicitud', response, '800px')
        .afterClosed().subscribe( resp => {
          // POR AJUSTAR: Falta validar autentcación para decidir hacia donde navega el router
          this.sharedService.clearTemporaryFileList();
          this.router.navigate(['solicitudes']);
        });
    }, error => dialogRef.close() );
  }
}
