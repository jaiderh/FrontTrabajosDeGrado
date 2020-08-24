import { DegreeProject } from './../models/degree-project';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FilterSetting } from '../models/filter-setting';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TableFilterComponent } from '../utils/table-filter.component';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Component({
  selector: 'app-degree-project-list',
  templateUrl: './degree-project-list.component.html',
  styleUrls: ['./degree-project-list.component.css']
})
export class DegreeProjectListComponent implements OnInit {

  // SETTINTG FOR REQUEST GRID
  displayedColumns: string[];
  filterSettings: FilterSetting[];
  loading$: Observable<boolean>;
  dataSource: MatTableDataSource<DegreeProject> = new MatTableDataSource<DegreeProject>();
  data: DegreeProject[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterRef') tableFilter: TableFilterComponent;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) {
    this.displayedColumns = config.DegreeProjectList_displayedColumns;
    this.filterSettings = config.DegreeProjectList_filterSettings;

    this.data = [
      {
        Id: 1, Title: 'Primer Trabajo de Grado de Prueba', Code: '2018-001', Authors: 'Miguel López',
        Program: 'Zootecnia', Director: 'Director de Prueba 1', Date: new Date('2018-03-02')
      },
      {
        Id: 2, Title: 'Segundo Trabajo de Grado de Prueba', Code: '2018-002', Authors: 'Jaider Miguel Hoyos',
        Program: 'Zootecnia', Director: 'Director de Prueba 2', Date: new Date('2018-03-12')
      },
      {
        Id: 3, Title: 'Terce Trabajo de Grado de Prueba', Code: '2018-003', Authors: 'Amanda Arévalo',
        Program: 'Ingeniería Agronónica', Director: 'Director de Prueba 3', Date: new Date('2018-03-07')
      },
      {
        Id: 4, Title: 'Cuarto Trabajo de Grado de Prueba', Code: '2018-004', Authors: 'Paola Valencia',
        Program: 'Zootecnia', Director: 'Director de Prueba 4', Date: new Date('2018-04-02')
      },
      {
        Id: 5, Title: 'Quitno Trabajo de Grado de Prueba', Code: '2018-005', Authors: 'Gerando Castiblanco',
        Program: 'Cartografía', Director: 'Director de Prueba 5', Date: new Date('2018-04-10T00:')
      }
    ];

    this.dataSource = new MatTableDataSource( this.data );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


  }

  ngOnInit() {
  }

}
