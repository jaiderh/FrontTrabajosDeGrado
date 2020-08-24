import { FilterSetting } from './../models/filter-setting';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { QueryParams, FilterParam } from '../models/query-params';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TableFilterComponent } from '../utils/table-filter.component';


import {tap} from 'rxjs/operators';
import {merge} from 'rxjs/observable/merge';
import {fromEvent} from 'rxjs/observable/fromEvent';
import { CouncilListDataSource } from './council-list.datasource';
import { CouncilService } from './council.service';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Council } from '../models/council';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryResult } from '../models/query-result';

import { LoaderType } from './../shared/loader/loader.component';

@Component({
  selector: 'app-council-list',
  templateUrl: './council-list.component.html',
  styleUrls: ['./council-list.component.css']
})
export class CouncilListComponent  implements AfterViewInit, OnInit, OnDestroy {
  queryParams: QueryParams;
  dataSource = new MatTableDataSource<Council>( [] );

  title = 'Administración de Actas';
  existsUnclosedCouncil: boolean;

  displayedColumns: string[];
  filterSettings: FilterSetting[];

  public LoaderType: any = LoaderType;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterRef') tableFilter: TableFilterComponent;

  constructor(  @Inject(APP_CONFIG) private config: IAppConfig,
                private councilService: CouncilService,
                private route: ActivatedRoute,
                private router: Router) {

    this.displayedColumns = config.CouncilList_displayedColumns;
    this.filterSettings = config.CouncilList_filterSettings;

    const concilList = (<QueryResult<Council>> this.route.snapshot.data['councilList']).Data;
    this.dataSource.data = concilList ;
    this.existsUnclosedCouncil = concilList.some ( item => item.State === this.config.COUNCIL_STATE_OPEN.Name );
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.tableFilter.filter.subscribe((filterResult) => {
      if (filterResult.filtered) {
        const filterField = filterResult.fieldName;

        this.dataSource.filterPredicate =
          (data: Council, filter: string) => {
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

  onCouncilAdd() {
    this.councilService.create().subscribe( newCouncilId => {
      this.router.navigate(['/actas', newCouncilId]);
    });
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }



}
