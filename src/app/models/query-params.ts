
export class QueryParams {
  PageIndex: number;
  PageSize: number;
  SortField = '';
  SortDirection = '';
  FilterBy: FilterParam[] = new Array<FilterParam>();

  public clear() {
    this.PageIndex = 0;
    this.PageSize = 0;
    this.SortDirection = '';
    this.SortField = '';
    this.FilterBy.length = 0;
  }
}

export class FilterParam {

  constructor( public FieldName: string = '',
                public Comparator: string = '',
                public Value1: string = '',
                public Value2: string = ''  ) { }
}
