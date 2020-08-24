import { Council } from './../models/council';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CouncilService } from './council.service';
import { QueryResult } from '../models/query-result';

@Injectable({
  providedIn: 'root'
})
export class CouncilListResolver implements Resolve<QueryResult<Council>> {

  constructor(private councilService: CouncilService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): QueryResult<Council> |
                                                                        Observable<QueryResult<Council>>
                                                                        | Promise<QueryResult<Council>> {
    return this.councilService.getList(null);
  }
}
