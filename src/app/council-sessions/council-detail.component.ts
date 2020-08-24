import { LoaderType } from './../shared/loader/loader.component';
import { CouncilService } from './council.service';
import { RequestDetailDialogComponent } from './../requests/request-detail-dialog/request-detail-dialog.component';
import { IRequest, IRequestDetail } from './../models/request';

import { Component, OnInit, Inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CouncilDetail } from '../models/council-detail';
import { ActivatedRoute } from '@angular/router';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { FilterSetting } from '../models/filter-setting';
import { Observable } from 'rxjs/Observable';
import { TableFilterComponent } from '../utils/table-filter.component';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { QueryParams, FilterParam } from '../models/query-params';
import { RequestService } from '../requests/request.service';
import { SharedService } from '../shared/shared.service';
import { Notification_Type, NotificationService } from '../shared/notification.service';
import { StorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-council-detail',
  templateUrl: './council-detail.component.html',
  styleUrls: ['./council-detail.component.css']
})
export class CouncilDetailComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterRef') tableFilter: TableFilterComponent;
  @ViewChild('dt2') endDatePicker: OwlDateTime<Date>;

  private currentCouncil: CouncilDetail;
  private originalCouncil: CouncilDetail;

  public LoaderType: any = LoaderType;

  editorConfig: any;

  title: string;

  // SETTINTG FOR REQUEST GRID
  requestList_displayedColumns: string[];
  displayedColumns: string[];
  filterSettings: FilterSetting[];
  dataSource: MatTableDataSource<IRequest> = new MatTableDataSource<IRequest>([]);
  formDisabled = false;

  LOCALKEY_PREFIX = 'ACTA_';

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
      private route: ActivatedRoute,
      private requestService: RequestService,
      public dialog: MatDialog,
      public sharedService: SharedService,
      private councilService: CouncilService,
      private notificationService: NotificationService,
      private cd: ChangeDetectorRef,
      @Inject(LOCAL_STORAGE) private storage: StorageService) {

    this.editorConfig = config.ckeditor_settings;
    this.displayedColumns = config.CouncilDetail_RequestList_displayedColumns;
    // this.dataSource = new MatTableDataSource<IRequest>();
    this.filterSettings = config.CouncilList_RequestList_filterSettings;

  }

  get council(): CouncilDetail {
    return this.currentCouncil;
  }

  set council(value: CouncilDetail) {
    this.currentCouncil = value;
    this.originalCouncil = Object.assign({}, value);
    this.title = 'Acta ' +  this.currentCouncil.Number + ' de ' + this.currentCouncil.Year;

    if (this.currentCouncil.StateId === this.config.COUNCIL_STATE_CLOSED.Id) {
      this.formDisabled = true;
      this.editorConfig['readOnly'] = true;
    }
  }

  ngOnInit() {
    this.onCouncilRetrieved( this.route.snapshot.data['councilDetail'] );
  }

  ngAfterViewInit(): void {

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

    this.cd.detectChanges();
  }

  onCouncilRetrieved(council: CouncilDetail): void {
    this.council = council;
    this.dataSource.data = council.Requests;
    // this.basicDataFormGroup.addControl( '' )
  }

  onClickDetail(id: number) {
    this.requestService.get( id ).subscribe( request => this.showRequestDetails(request) );
  }

  saveCouncil() {
    const councilData = Object.assign({}, this.currentCouncil);
    councilData.Requests = [];
    // Save locally first
    this.saveLocalCouncil(councilData);
    this.councilService.save( councilData ).subscribe (
      (resp) => this.notificationService.show( { message: <string>resp, type: Notification_Type.INFORMATION  } ) );
  }

  saveLocalCouncil(councilData: CouncilDetail) {
    const curdate = new Date();
    let previousData = new Array();
    const key = `${this.LOCALKEY_PREFIX}${councilData.Code}`;
    const prevCouncil = this.storage.get(key);
    if ( prevCouncil ) {
      if ( prevCouncil.previous.length ) {
        previousData = prevCouncil.previous;
      }
      previousData.push( { council: prevCouncil.council, date: prevCouncil.date } );
    }
    this.storage.set(key, { council: councilData, date: curdate, previous: previousData } );
  }

  showRequestDetails(request: IRequestDetail) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { request: request,  formDisabled: this.formDisabled };
    dialogConfig.minWidth = '80%';
    dialogConfig.minHeight = '95%';

    const dialogRef = this.dialog.open(RequestDetailDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.onEndDateChange();
      }
    });
  }

  onEndDateChange() {
    const dateRangeFilter = new QueryParams();
    dateRangeFilter.SortField = 'Id';
    dateRangeFilter.SortDirection = 'asc';

    dateRangeFilter.FilterBy.push(
      new FilterParam(
        'Date',
        'between',
        `${this.council.StartDate}`,
        this.council.EndDate instanceof Date ? this.council.EndDate.toISOString() : `${this.council.EndDate}`,
      )
    );

    this.requestService.getList( dateRangeFilter )
      .subscribe( result => {
        this.dataSource.data = result.Data;
      } );
  }

  downloadFile() {
    this.sharedService.downloadCouncilFile(this.council.Id);
  }

}
