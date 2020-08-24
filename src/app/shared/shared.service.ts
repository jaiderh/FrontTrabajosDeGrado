import { Term } from './../dashboard/term';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { InitialSettings } from '../models/initial-settings';
import { environment } from '../../environments/environment';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { FilterOptions } from '../models/filter-setting';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class SharedService {

  private BASE_PATH = 'shared';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  private FILE_DOWNLOAD_PATH = 'file';
  private DASHBOARD_TERMS_PATH = 'dashboard_terms';
  private DASHBOARD_DATA_PATH = 'dashboard_data';

  // private FILE_DOWNLOAD_URL = `${environment.apiURL}file/download`; POR AJUSTAR

  private FILE_DOWNLOAD_URL = `http://gestionactasudec-001-site3.itempurl.com/WEBAPI/api/file/download`;

  settings: InitialSettings;

  constructor(private http: HttpClient,
                @Inject(APP_CONFIG) private config: IAppConfig,
                @Inject(SESSION_STORAGE) private storage: StorageService) { }

  loadSettings(): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.http.get<InitialSettings>(`${this.BASE_URL}/initial_settings`).subscribe( settings => {
          this.settings = settings ;

          // Set REQUEST_TYPE OPTIONS
          const request_type_options = new FilterOptions(  settings.RequestTypes, 'Name', 'Name' );

          this.config.RequestList_filterSettings
            .find( x => x.columnName === 'RequestType' ).columnOptions = request_type_options;

          this.config.CouncilList_RequestList_filterSettings
            .find( x => x.columnName === 'RequestType' ).columnOptions = request_type_options;
          // ------------------ //


          // Set PROGRAM OPTIONS
          const program_options = new FilterOptions(  settings.Programs, 'Name', 'Name' );

          this.config.RequestList_filterSettings
            .find( x => x.columnName === 'Program' ).columnOptions = program_options;

          this.config.CouncilList_RequestList_filterSettings
            .find( x => x.columnName === 'Program' ).columnOptions = program_options;
          // ------------------ //


          // Set BRANCHES OPTIONS
          const branch_options = new FilterOptions(  settings.Branches, 'Name', 'Name' );

          this.config.RequestList_filterSettings
            .find( x => x.columnName === 'City' ).columnOptions = branch_options;

          this.config.CouncilList_RequestList_filterSettings
            .find( x => x.columnName === 'City' ).columnOptions = branch_options;
          // ------------------ //

          resolve(true);
        });
    });
  }

  getFileIconName (filename) {
    const ext = filename.substr(filename.lastIndexOf('.') + 1);

    switch (ext) {
      case 'jpg': return 'jpg_icon';
      case 'png': return 'png_icon';
      case 'pdf': return 'pdf_icon';
      case 'doc':
      case 'docx':
        return 'word_icon';
      case 'xls':
      case 'xlsx':
        return 'excel_icon';

      default: return 'other_icon';
    }
  }


  downloadFile(params) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => httpParams = httpParams.set(key, params[key]) );

    const a = document.createElement('a');
    a.href =  this.FILE_DOWNLOAD_URL + '?' + httpParams.toString();
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
  }

  downloadRequestFile(requestId: number, fileName: string) {
    const params = { type: 'SOLICITUD', id: requestId, fileName: fileName };
    this.downloadFile(params);
  }

  downloadCouncilFile(councilId: number) {
    const params = { type: 'ACTA', id: councilId, fileName: 'NA' };
    this.downloadFile(params);
  }

  getDashboardTerms(): Observable<Term[]> {
    return this.http.get<Term[]>( `${this.BASE_URL}/${this.DASHBOARD_TERMS_PATH}` );
  }

  getDashboardData(term: Term): Observable<any> {
    const httpParams = new HttpParams()
                                .set('fechaInicio', term.StartDate.toString())
                                .set('fechaFin', term.EndDate.toString());

    return this.http.get( `${this.BASE_URL}/${this.DASHBOARD_DATA_PATH}`, { params: httpParams } );
  }

  setTemporaryFileList(uploadKey, fileList, expireDate) {
    this.storage.set('uploadKey', uploadKey);
    this.storage.set('tempFileList', fileList);
    this.storage.set('uploadKey-expiration', expireDate);
  }

  clearTemporaryFileList() {
    this.storage.remove('uploadKey');
    this.storage.remove('uploadKey-expiration');
    this.storage.remove('tempFileList');
  }

}

export function settingsProviderFactory(provider: SharedService) {
  return () => provider.loadSettings();
}
