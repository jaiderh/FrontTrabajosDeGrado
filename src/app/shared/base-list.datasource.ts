
import { QueryParams } from './../models/query-params';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { QueryResult } from '../models/query-result';
import { BaseService } from './base.service';

export class BaseListDataSource<TResult> implements DataSource<TResult> {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestsSubject = new BehaviorSubject<TResult[]>([]);

  public loading$ = this.loadingSubject.asObservable();
  public count$;

  constructor(private baseService: BaseService) {}

  connect(collectionViewer: CollectionViewer): Observable<TResult[]> {
    return this.requestsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestsSubject.complete();
    this.loadingSubject.complete();
  }

  loadList(queryParams: QueryParams ) {
    this.loadingSubject.next(true);

    this.baseService.getList(queryParams)
      .pipe(
        catchError(() => of(new QueryResult<TResult>())),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(result => {
        this.count$ = result.Total;
        this.requestsSubject.next( result.Data ) ;
      });
  }
}

