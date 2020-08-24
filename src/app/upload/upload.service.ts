import { Injectable } from '@angular/core';
import { HttpRequest, HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private loadingSubject: Subject<boolean>;
  public loading: Observable<boolean>;
  public loadedFiles: number;

  private BASE_PATH = 'file';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  private UPLOAD_URL = `${this.BASE_URL}/upload`;
  private REMOVE_FILE_URL = `${this.BASE_URL}/delete`;

  constructor( private http: HttpClient ) {
    this.loadingSubject = new Subject();
    this.loading = this.loadingSubject.asObservable();
   }

  public delete( fileId: number, uploadKey: string ): Observable<any> {
    return this.http.get(`${this.REMOVE_FILE_URL}/${fileId}/${uploadKey}`);
  }

  public upload( files: Array<File>, data: any ): { progress: Observable<number>, response: Observable<HttpResponse<any>> } {

    this.loadingSubject.next(true);

    // create a multipart/form data for the files
    const formData = new FormData();

    // append data object values
    if (data) {
      Object.keys( data ).forEach( key => formData.append( key, data[key] ) );
    }

    let fileIndex = 0;

    // append eacch file to the form
    files.forEach( file => formData.append(`file${++fileIndex}`, file, file.name));

    // create a http-post request, pass the form data and tell it to report the upload progress
    const req = new HttpRequest('POST',  this.UPLOAD_URL, formData, { reportProgress: true });

    // create a new progress-subject
    const progressSubject = new Subject<number>();

    const responseSubject = new Subject<HttpResponse<any>>();

    // send the http-request and subscribe for progress-updates
    this.http.request( req ).subscribe( event => {
      if ( event.type === HttpEventType.UploadProgress ) {

        // calculate the progress porcentage
        const progressPorcentage = Math.round( 100 * ( event.loaded / event.total ) );

        // pass the porcentage into the progress-stream
        progressSubject.next( progressPorcentage );
      } else if ( event instanceof HttpResponse ) {
        this.loadingSubject.next(false);

        // close the progress-stream if we  get an answer from the API
        // the upload is completed
        progressSubject.complete();

        responseSubject.next(event);
        responseSubject.complete();
      }
    });

    return { progress: progressSubject.asObservable(), response: responseSubject.asObservable() };
  }

  public uploadIndividualFiles( files: Set<File>, data: any ): { [key: string]: Observable<number> } {
    // this will be the resulting map
    const status = {};

    files.forEach( file => {

      // create a multipart/form data for every file
      const formData = new FormData();

      // append current file
      formData.append('file', file, file.name);

      // append data object values
      if (data) {
        Object.keys( data ).forEach( key => formData.append( key, data[key] ) );
      }

      // create a http-post request, pass the form data and tell it to report the upload progress
      const req = new HttpRequest('POST',  this.UPLOAD_URL, formData, { reportProgress: true });

      // create a new progress-subject for every file
      const progressSubject = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request( req ).subscribe( event => {
        if ( event.type === HttpEventType.UploadProgress ) {

          // calculate the progress porcentage
          const progressPorcentage = Math.round( 100 * ( event.loaded / event.total ) );

          // pass the porcentage into the progress-stream
          progressSubject.next( progressPorcentage );
        } else if ( event instanceof HttpResponse ) {
          console.log(event);

          // close the progress-stream if we  get an answer from the API
          // the upload is completed
          progressSubject.complete();
          this.loadedFiles++;
        }
      });

      // save every progress-observable in a map of all observables
      status[file.name] = { progress: progressSubject.asObservable() };
    });

    return status;
  }
}
