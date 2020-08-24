
import { QueryParams } from './../models/query-params';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { IRequest } from '../models/request';
import { RequestService } from './request.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { QueryResult } from '../models/query-result';
import { BaseListDataSource } from '../shared/base-list.datasource';

export class RequestListDataSource extends BaseListDataSource<IRequest>  {

  constructor(private requestsService: RequestService) {
    super(requestsService);
  }

}
