import { ITimeLineElement } from './../vertical-timeline-element/timeline-element';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventProjectService } from '../event-project/event-project.service';
import { BasicData } from '../models/initial-settings';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  autores = [];
  director = { Nombres :'', Apellidos : '' , Telefono : '', Email: '', DetalleRol : '' };
  events: Array<ITimeLineElement> = [];

  proyecto: any = {};
  formDisabled = false;

  constructor( private eventProjectService: EventProjectService,
                private route: ActivatedRoute,
                public sharedService: SharedService ) {

    const id = +route.snapshot.paramMap.get('id');
    this.eventProjectService.getProject(id)
              .subscribe( resp => {
                this.proyecto = resp;
                this.autores = resp.autores;
                this.director = resp.director;
                resp.Eventos.forEach(event => {
                  this.events.push({
                    id: event.Id,
                    date: new Date(event.Fecha),
                    class: 'vertical-timeline-element--work',
                    content: `<h3 class=\"vertical-timeline-element-title\">${event.Tipo}</h3><p>${event.Detalle}</p>`,
                    iconStyle: 'icon-event-work',
                    state: { visible: true },
                    // tslint:disable-next-line:max-line-length
                    icon: 'create_new_folder',
                    files: event.Archivos,
                    hasFiles: true
                  } as ITimeLineElement);
                });
              });
  }


  get Facultades(): BasicData[] { return this.sharedService.settings.Faculties; }
  get Programas(): BasicData[] { return this.sharedService.settings.Programs; }
  get Sedes(): BasicData[] { return this.sharedService.settings.Branches; }


  ngOnInit() {
  }

}
