import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IRequest } from '../models/request';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';
import { QueryResult } from '../models/query-result';

@Injectable({
  providedIn: 'root'
})
export class RequestListResolver implements Resolve<QueryResult<IRequest>> {
  constructor(private requestService: RequestService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QueryResult<IRequest>
                                                                      | Observable<QueryResult<IRequest>>
                                                                      | Promise<QueryResult<IRequest>> {
    return this.requestService.getRequestList(null);
  }
}
