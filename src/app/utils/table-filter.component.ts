import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { MatMenu, MatMenuTrigger, MatSelect, MatInput } from '@angular/material';
import { FilterSetting, FilterOptions } from '../models/filter-setting';
import { FilterResult } from '../models/filter-result';

@Component({
  selector: 'app-table-filter',
  exportAs: 'tableFilter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {

  CONTAINS_COMPARATOR = 'contains';
  EQUALS_COMPARATOR = '=';

  Object = Object;

  columnValue: string;
  selectedFilterSetting: FilterSetting;
  filterResult: FilterResult;

  private filterSubject: Subject<FilterResult> = new Subject<FilterResult>() ;
  filter: Observable<FilterResult>;

  filtered: boolean;
  isSelectionList: boolean;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild('matSelectColumn') matSelectColumn: MatSelect;
  @ViewChild('matSelectValue') matSelectValue: MatSelect;
  @ViewChild('matInputValue') matInputValue: MatInput;

  @Input() filterSettings: FilterSetting[] = [];

  constructor() {
    this.filter = this.filterSubject.asObservable();
  }

  ngOnInit() {/*
    this.matSelectColumn.valueChange.subscribe( value => {
      console.log(value);
      this.columnValue = '';
      this.isSelectionList = this.selectedFilterSetting.columnOptions.length > 0;
      if ( !this.isSelectionList ) {
        this.matInputValue.focus();
      }
    });*/
  }

  onApplyFilter(event) {
    this.handleClick(event);

    if (this.columnValue) {
      this.filtered = true;
      this.filterResult = new FilterResult();

      this.filterResult.filtered = this.filtered;
      this.filterResult.fieldCaption = this.selectedFilterSetting.columnCaption;
      this.filterResult.fieldName = this.selectedFilterSetting.columnName;
      this.filterResult.value = this.columnValue;
      this.filterResult.type = this.selectedFilterSetting.columnType;
      this.filterResult.comparator = this.selectedFilterSetting.columnType === 'text' ?
                               this.CONTAINS_COMPARATOR :
                               this.EQUALS_COMPARATOR;

      this.filterSubject.next(this.filterResult);

      console.log( 'from onApplyFilter: ' + JSON.stringify(this.filterResult)  );
    }
    this.menuTrigger.closeMenu();
  }

  onRemoveFilter(event) {
    this.handleClick(event);

    this.filtered = false;
    this.isSelectionList = false;
    this.columnValue = '';
    this.matSelectColumn.value = null;
    this.selectedFilterSetting = null;

    this.filterSubject.next(new FilterResult());

    this.menuTrigger.closeMenu();
  }

  handleClick(event) {
    event.stopPropagation();
  }

}
