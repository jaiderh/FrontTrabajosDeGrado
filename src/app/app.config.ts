import { BasicData } from './models/initial-settings';
import { InjectionToken } from '@angular/core';
import { FilterSetting } from './models/filter-setting';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
    RequestList_displayedColumns: string[];
    ListaProyectos_displayedColumns: string[];
    RequestList_filterSettings: FilterSetting[];

    CouncilList_displayedColumns: string[];
    CouncilList_filterSettings: FilterSetting[];
    CouncilDetail_RequestList_displayedColumns: string[];
    CouncilList_RequestList_filterSettings: FilterSetting[];


    DegreeProjectList_displayedColumns: string[];
    DegreeProjectList_filterSettings: FilterSetting[];

    RequestStates: BasicData[];
    ApplicantTypes: BasicData[];
    COUNCIL_STATE_OPEN: BasicData;
    COUNCIL_STATE_CLOSED: BasicData;

    ckeditor_settings: any;
}

export const AppConfig: IAppConfig = {

  RequestList_displayedColumns :
  [
    'actions', 'Code', 'Date', 'RequestType',
    'Applicants', 'State', 'Act', 'Priority',
    'City', 'Program'
  ],
  ListaProyectos_displayedColumns :
  [
    'actions', 'Codigo', 'Titulo', 'Autores',
    'Director', 'Programa', 'Sede', 'Estado', 'FechaRegistro'
  ],
  RequestList_filterSettings: [
    { columnName: 'Code', columnCaption: 'Código', columnType: 'text', columnOptions: null },
    { columnName: 'Program', columnCaption: 'Programa', columnType: 'select', columnOptions: null },
    { columnName: 'RequestType', columnCaption: 'Tipo de Solicitud', columnType: 'select', columnOptions: null },
    { columnName: 'City', columnCaption: 'Sede', columnType: 'select', columnOptions: null },
    { columnName: 'Act', columnCaption: 'Acta', columnType: 'text', columnOptions: null }
  ],
  CouncilList_displayedColumns :
  [
    'actions', 'Code', 'DateTime',
    'SessionType', 'EndDate', 'State'
  ],
  CouncilList_filterSettings: [
    { columnName: 'Code', columnCaption: 'Código', columnType: 'text', columnOptions: null },
    { columnName: 'SessionType', columnCaption: 'SessionType', columnType: 'text', columnOptions: null }
  ],
  CouncilDetail_RequestList_displayedColumns :
  [
    'actions', 'Code', 'State', 'Date', 'Priority', 'City',
    'Program', 'RequestType', 'Applicants'
  ],
  CouncilList_RequestList_filterSettings: [
    { columnName: 'Code', columnCaption: 'Código', columnType: 'text', columnOptions: null },
    { columnName: 'State', columnCaption: 'Estado', columnType: 'text', columnOptions: null },
    { columnName: 'Priority', columnCaption: 'Prioridad', columnType: 'number', columnOptions: null },
    { columnName: 'Program', columnCaption: 'Programa', columnType: 'select', columnOptions: null },
    { columnName: 'Applicants', columnCaption: 'Solicitantes', columnType: 'select', columnOptions: null },
    { columnName: 'City', columnCaption: 'Sede', columnType: 'select', columnOptions: null },
    { columnName: 'RequestType', columnCaption: 'Tipo de Solicitud', columnType: 'select', columnOptions: null }
  ],

  DegreeProjectList_displayedColumns :
  [
    'actions', 'Code', 'Title',
    'Authors', 'Program', 'Director', 'Date'
  ],

  DegreeProjectList_filterSettings: [
    { columnName: 'Code', columnCaption: 'Código', columnType: 'text', columnOptions: null },
    { columnName: 'Program', columnCaption: 'Programa', columnType: 'text', columnOptions: null },
    { columnName: 'Authors', columnCaption: 'Autores', columnType: 'text', columnOptions: null },
    { columnName: 'Title', columnCaption: 'Título', columnType: 'text', columnOptions: null },
    { columnName: 'Director', columnCaption: 'Director', columnType: 'text', columnOptions: null }
  ],

  RequestStates: [
    { Id: 1, Name: 'PENDIENTE'},
    { Id: 2, Name: 'APROBADO'},
    { Id: 3, Name: 'NO APROBADO'},
    { Id: 4, Name: 'AVALADO'},
    { Id: 5, Name: 'NO AVALADO'},
    { Id: 6, Name: 'ENTERADO'},
    { Id: 7, Name: 'REMITIDO'},
    { Id: 8, Name: 'RECHAZADA POR FALTA DE DOCUMENTOS'},
    { Id: 9, Name: 'ANULADO'},
    { Id: 10, Name: 'RECHAZADO'},
  ],

  ApplicantTypes: [
    { Id: 1, Name: 'Estudiante'},
    { Id: 2, Name: 'Docente'},
    { Id: 3, Name: 'Otro'},
    { Id: 4, Name: 'Coordinador de Programa'},
    { Id: 5, Name: 'Director de Programa/Área'},
    { Id: 6, Name: 'Administrativo'}
  ],

  COUNCIL_STATE_OPEN : { Id: 1, Name: 'ABIERTA' },
  COUNCIL_STATE_CLOSED : { Id: 2, Name: 'CERRADA' },

  ckeditor_settings: {
    language: 'es',
    height: 450,
    // disableNativeSpellChecker: false,
    scayt_sLang: 'es_CO',
    extraPlugins: 'divarea',
    toolbarGroups : [
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'others', groups: ['others'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'about', groups: ['about'] }
      ],
    removeButtons: 'Underline,About,Maximize,Image',
    removePlugins: 'print,find,templates,flash,iframe,forms,image,preview,save,link,smiley,newpage,language,pagebreak,pastefromword'
   }
};
