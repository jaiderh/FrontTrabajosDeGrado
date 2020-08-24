import { Observable } from 'rxjs/Observable';
import { QueryParams } from './../models/query-params';
import { Injectable } from '@angular/core';
import { QueryResult } from '../models/query-result';
import { BaseService } from '../shared/base.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Council } from '../models/council';
import { CouncilDetail } from '../models/council-detail';

@Injectable()
export class CouncilService extends BaseService {

  private BASE_PATH = 'actas';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  constructor(private http: HttpClient) {
    super();
   }

   public save( councilDetail: CouncilDetail ) {
    return this.http.post(  `${this.BASE_URL}`, councilDetail );
   }

   public create( ): Observable<number> {
    return this.http.post<number>( `${this.BASE_URL}/create`, null );
   }

   public getCouncilList( queryParams: QueryParams ): Observable<QueryResult<Council>> {
    const params = super.generateHttpParams(queryParams);

    return this.http.get<QueryResult<Council>>(this.BASE_URL, { params: params } );
   }

   public getCouncilDetail(id: number): Observable<CouncilDetail> {
     const url =  `${this.BASE_URL}/${id}`;
     return this.http.get<CouncilDetail>( url );
   }

   public getList(queryParams: QueryParams) {
     return this.getCouncilList(queryParams);
   }
}
