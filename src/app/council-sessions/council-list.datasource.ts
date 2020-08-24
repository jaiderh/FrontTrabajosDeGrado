import { BaseListDataSource } from './../shared/base-list.datasource';

import { QueryParams } from './../models/query-params';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { QueryResult } from '../models/query-result';
import { Council } from '../models/council';
import { CouncilService } from './council.service';

export class CouncilListDataSource extends BaseListDataSource<Council> {

  constructor(private councilService: CouncilService) {
    super(councilService);
  }

}
