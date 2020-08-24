import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTabGroup, MatDialog } from '@angular/material';
import { BasicData } from '../models/initial-settings';
import { SharedService } from '../shared/shared.service';
import { FileUploadComponent } from '../upload/file-upload/file-upload.component';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NotificationService } from '../shared/notification.service';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { GenericDialogService } from '../generic-dialog/generic-dialog.service';
import { EventProjectService } from './event-project.service';

@Component({
  selector: 'app-event-project',
  templateUrl: './event-project.component.html',
  styleUrls: ['./event-project.component.scss']
})
export class EventProjectComponent implements OnInit, AfterViewInit {

  data: any = { DatosEvento: { Archivos: []}, DatosProyecto: {} };
  autores = [];
  // tslint:disable-next-line:max-line-length
  director = { Nombres : '', Apellidos : '' , Telefono : '', Email: '', DetalleRol : '', Rol: 'Director', EtiquetaDetalleRol: 'Tipo de Director', Activo: true };

  MAX_REQUEST_APPLICANTS = 3;
  MAX_FILE_COUNT = 3;
  uploadData: any = {};
  uploadKeyExpiration = '';
  editorConfig: any;
  formDisabled = false;

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  @ViewChild(FileUploadComponent) uploader: FileUploadComponent;

  constructor(public sharedService: SharedService,
              @Inject(SESSION_STORAGE) private storage: StorageService,
              @Inject(APP_CONFIG) private config: IAppConfig,
              private notificationService: NotificationService,
              private genericDialogService: GenericDialogService,
              private dialog: MatDialog,
              private eventProjectService: EventProjectService) {

    this.data.DatosProyecto.Facultad = this.sharedService.settings.Faculties[0].Name;
    this.data.UploadKey = this.storage.get('uploadKey') || '';

    this.editorConfig = config.ckeditor_settings;
    this.editorConfig.height = '300';

    if (this.data.UploadKey) {
      this.data.DatosEvento.Archivos = this.storage.get('tempFileList');
      this.uploadKeyExpiration = this.storage.get('uploadKey-expiration');
    }
    this.uploadData = { type: 'TEMPFILE', uploadkey: this.data.UploadKey };
  }

  get Facultades(): BasicData[] { return this.sharedService.settings.Faculties; }
  get Programas(): BasicData[] { return this.sharedService.settings.Programs; }
  get Sedes(): BasicData[] { return this.sharedService.settings.Branches; }

  ngOnInit() {
  }

  onChange() {

  }

  agregarAutor() {
    this.autores.push( { Rol: 'Autor', Activo: true } );
    this.matTabGroup.selectedIndex = this.autores.length - 1;
  }

  borrarAutor(index: number) {
    this.autores.splice(index, 1);
  }

  fileIconName(fileName: string): string {
    return this.sharedService.getFileIconName(fileName);
  }

  onSubmit(formRef) {
    if (!formRef.valid) {
      this.genericDialogService.showInformationDialog(this.dialog, 'Nueva Solicitud',
         'Complete por favor la información requerida para registrar su solicitud', '600px');
      return;
    } else {
      const fechaRegistro = new Date();
      this.data.DatosEvento.Fecha = fechaRegistro;
      this.data.DatosProyecto.FechaRegistro = fechaRegistro;
      this.data.DatosProyecto.Miembros = this.autores.slice(0);
      this.data.DatosProyecto.Miembros.push( this.director );
      this.data.DatosProyecto.Miembros.forEach(element => element['FechaRegistro'] = fechaRegistro );

      console.log(this.data);

      // tslint:disable-next-line:max-line-length
      const dialogRef = this.genericDialogService.showProgressDialog(this.dialog, 'Estamos procesando su solicitud, por favor espere..', '540px');

      this.eventProjectService.addEventProject(this.data)
        .subscribe(
          resp => {
            console.log(resp);
            dialogRef.close();
            if ( resp.Success ) {
              this.genericDialogService.showInformationDialog(this.dialog, 'Su solicitud ha sido registrada con éxito!',
                 resp.Message, '540px')
                 .afterClosed()
                 .subscribe( () => {
                   this.sharedService.clearTemporaryFileList();
                   window.location.href = 'http://www.ucundinamarca.edu.co';
                });
              }
           },
          error => {
            dialogRef.close();
            this.notificationService.showError( 'Error procesando su solicitud.  Consulte con el administrador!' );
            console.error(error);
          });
    }
  }

  ngAfterViewInit(): void {
    this.agregarAutor();
  }

  onBorrarArchivo(fileId: number, index: number) {
    this.uploader.deleteFile( fileId, this.data.UploadKey ).subscribe( resp => {
        if (resp.Success) {
          // this.data.DatosEvento.Archivos.splice(index, 1);
          this.sharedService.setTemporaryFileList(this.data.UploadKey , this.data.DatosEvento.Archivos, this.uploadKeyExpiration);
        }
      });
  }

  onCargarArchivos() {
    this.uploader.addFiles().subscribe(
      (response: any) => {
        if (response && response.Result) {
          const result = response.Result;
          const expireDate = result.ExpireDate;

          // this.data.DatosEvento.Archivos = result.FileList;
          this.data.UploadKey = result.Uploadkey;
          this.uploadData.uploadkey = result.Uploadkey;

          this.sharedService.setTemporaryFileList(result.Uploadkey, result.FileList, expireDate);
        }
      },
      error => {
        this.notificationService.showError( error );
      }
    );
  }

}
