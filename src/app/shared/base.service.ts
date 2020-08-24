import { QueryParams } from './../models/query-params';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

export abstract class BaseService {

  constructor() { }

  // Generata a HttpParams Object from a QueryParams Object
  public generateHttpParams(queryParams: QueryParams): HttpParams {

    if (queryParams == null) { return null; }

    let params = new HttpParams()
                      .set('SortField', queryParams.SortField)
                      .set('SortDirection', queryParams.SortDirection);

    if (queryParams.PageIndex != null) {
      params = params.set('PageIndex',  (queryParams.PageIndex + 1).toString())
                      .set('PageSize', queryParams.PageSize.toString());

    }

    if (queryParams.FilterBy.length > 0) {
      queryParams.FilterBy.forEach((element, index) => {
        params = params.set( 'FilterBy[' + index + '].FieldName', element.FieldName )
                      .set( 'FilterBy[' + index + '].Comparator', element.Comparator )
                      .set( 'FilterBy[' + index + '].Value1', element.Value1 )
                      .set( 'FilterBy[' + index + '].Value2', element.Value2 );
      });
    }
    return params;
  }

  public toQueryParams(data: any): HttpParams {
    let params = new HttpParams();
    Object.keys(data).forEach( key => params = params.set(key, data[key]));
    console.log(params);
    return params;
  }

  public abstract getList( queryParams: QueryParams );

}
