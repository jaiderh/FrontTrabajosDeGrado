
import { QueryParams } from './../models/query-params';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRequest, IRequestDetail, RelatedRequest } from '../models/request';
import { Response } from '../models/response';
import { BaseService } from '../shared/base.service';
import { QueryResult } from '../models/query-result';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestService extends BaseService {

  private BASE_PATH = 'requests';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  constructor(private http: HttpClient) {
    super();
   }

  public getList(queryParams: QueryParams) {
    return this.getRequestList(queryParams);
  }

  public getRequestList(queryParams: QueryParams): Observable<QueryResult<IRequest>> {
    const params = super.generateHttpParams(queryParams);
    return this.http.get<QueryResult<IRequest>>( this.BASE_URL,  { params: params } );
  }

  public get(id: number): Observable<IRequestDetail> {
    return this.http.get<IRequestDetail>( `${this.BASE_URL}/${id}` );
  }

  public getApplicantRelatedRequests(applicantId: number, requestId: number): Observable<RelatedRequest[]> {
    return this.http.get<RelatedRequest[]>( `${this.BASE_URL}/applicant_related_requests/${applicantId}/exclude_request/${requestId}` );
  }

  /*
  public getDetailedList(queryParams: QueryParams): Observable<IRequestDetail> {
    const params = super.generateHttpParams(queryParams);
    return this.http.get<IRequestDetail>( `${this.BASE_URL}/detailed_list`,  { params: params }  );
  }*/

  public respond(response: Response) {
    return this.http.post(  `${this.BASE_URL}/respond`, response );
  }

  public save(request: IRequestDetail): Observable<string> {
    return this.http.post<string>( this.BASE_URL, request );
  }
}
