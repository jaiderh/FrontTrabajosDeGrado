import { ProjectDetailComponent } from './project-detail/project-detail.component';

import { TemplateResolver } from './templates/template-resolver.service';
import { TemplateDetailComponent } from './templates/template-detail.component';
import { DegreeProjectListComponent } from './degree-projects/degree-project-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './requests/request-list.component';
import { CouncilListComponent } from './council-sessions/council-list.component';
import { CouncilDetailComponent } from './council-sessions/council-detail.component';
import { CouncilDetailResolver } from './council-sessions/council-detail-resolver.service';
import { DegreeProjectTimelineComponent } from './degree-projects/degree-project-timeline.component';
import { CouncilListResolver } from './council-sessions/council-list-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTermsResolver } from './dashboard/dashboard-terms-resolver.service';
import { RequestDetailComponent } from './requests/request-detail.component';
import { RequestDetailResolver } from './requests/request-detail-resolver.service';
import { RequestListResolver } from './requests/request-list-resolver.service';
import { EventProjectComponent } from './event-project/event-project.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: { breadcrumb: 'Inicio' } },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: 'Dashboard' },
    resolve: { dashbardTermList : DashboardTermsResolver }
  },
  {
    path: 'solicitudes',
    data: { breadcrumb: 'Solicitudes' },
    children: [
      {
        path: '',
        component: RequestListComponent,
        data: { breadcrumb: '' },
        resolve: { requestList: RequestListResolver }
      },
      {
        path: ':id',
        component: RequestDetailComponent,
        data: { breadcrumb: 'detalle de solicitud' },
        resolve: { request: RequestDetailResolver }
      }
    ]
  },
  {
    path: 'actas',
    data: { breadcrumb: 'Concejos de Facultad' },
    children: [
      {
        path: '', component: CouncilListComponent,
        data: { breadcrumb: 'Actas' } ,
        resolve: { councilList: CouncilListResolver }
      },
      {
        path: ':id',
        component: CouncilDetailComponent,
        resolve: { councilDetail: CouncilDetailResolver },
        data: { breadcrumb: 'Detalle Acta' }
      }
    ]
  },
  {
    path: 'plantillas',
    data: { breadcrumb: 'Plantillas' },
    children: [
      {
        path: '',
        redirectTo: 'NOTIFSOLICITUD',
        pathMatch: 'full'
      },
      {
        path: ':code',
        component: TemplateDetailComponent,
        data: { breadcrumb: '' },
        resolve: { template: TemplateResolver }
      }
    ]
  },
  { path: 'trabajos-de-grado/timeline', component: DegreeProjectTimelineComponent },
  { path: 'trabajos-de-grado', component: DegreeProjectListComponent },
  { path: 'trabajos-de-grado/solicitud', component: EventProjectComponent },
  { path: 'trabajos-de-grado/lista-proyectos', component: ProjectListComponent },
  { path: 'trabajos-de-grado/detalle-proyecto/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
