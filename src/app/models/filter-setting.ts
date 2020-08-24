export class FilterSetting {

  constructor ( public columnName: string,
                public columnCaption: string,
                public columnType: string,
                public columnOptions: FilterOptions
              ) {}
}

export class FilterOptions {

  constructor ( public list: any,
                public fieldCaption: string,
                public fieldValue: string ) {}
}
