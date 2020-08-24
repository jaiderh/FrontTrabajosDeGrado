import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FilterSetting } from '../models/filter-setting';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TableFilterComponent } from '../utils/table-filter.component';
import { IAppConfig, APP_CONFIG } from '../app.config';
import { EventProjectService } from '../event-project/event-project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[];
  filterSettings: FilterSetting[];
  loading$: Observable<boolean>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  data: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterRef') tableFilter: TableFilterComponent;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private eventProjectService: EventProjectService) {
    this.displayedColumns = config.ListaProyectos_displayedColumns;
    this.filterSettings = config.DegreeProjectList_filterSettings;

    this.eventProjectService.listProjects()
      .subscribe( resp => this.dataSource.data = resp );
  }

  ngOnInit() {
  }
}
