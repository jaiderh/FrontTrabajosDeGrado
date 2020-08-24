import { FilterSetting } from './../models/filter-setting';
import { QueryParams, FilterParam } from './../models/query-params';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit,
  Input, Inject, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { RequestService } from './request.service';
import { Subscription } from 'rxjs/Subscription';
import { RequestListDataSource } from './request-list.datasource';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from 'rxjs/observable/merge';
import {fromEvent} from 'rxjs/observable/fromEvent';
import { TableFilterComponent } from '../utils/table-filter.component';
import { IRequest } from '../models/request';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { QueryResult } from '../models/query-result';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements AfterViewInit, OnInit, OnDestroy {
  subscription: Subscription;
  dataSource = new MatTableDataSource<IRequest>( [] );

  title = 'Administración de Solicitudes';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterRef') tableFilter: TableFilterComponent;

  @Input() columns: string[];
  displayedColumns: string[];
  filterSettings: FilterSetting[];

  @Output() clickDetail: EventEmitter<number> = new EventEmitter<number>();

  @Input() initialData: IRequest[];
  isPreloaded: boolean;

  constructor( @Inject(APP_CONFIG) private config: IAppConfig,
                private requestService: RequestService,
                private cdRef: ChangeDetectorRef,
                private route: ActivatedRoute) {

    this.displayedColumns = this.config.RequestList_displayedColumns;
    this.filterSettings = config.RequestList_filterSettings;

    const requestList = ( this.route.snapshot.data['requestList'] as QueryResult<IRequest>).Data;
    this.dataSource.data = requestList;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tableFilter.filter.subscribe((filterResult) => {
      if (filterResult.filtered) {
        const filterField = filterResult.fieldName;

        this.dataSource.filterPredicate =
          (data: IRequest, filter: string) => {
            switch (this.tableFilter.filterResult.type) {
              case 'number':
                return data[this.tableFilter.filterResult.fieldName] === +filter;
              default:
                return data[this.tableFilter.filterResult.fieldName].indexOf(filter) !== -1;
            }
          };
        this.dataSource.filter = filterResult.value;
      } else {
        this.dataSource.filter = '';
      }
    });
  }
}
