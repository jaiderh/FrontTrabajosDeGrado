import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Term } from './term';
import { ChartColorSets } from './chart-color-sets';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string;
  terms: Term[];
  view: any ;
  selectedTerm: Term;
  colorScheme: any;
  selectedColorScheme: string;
  requestTypeData: Array<any>;
  programsData: Array<any>;
  branchesData: Array<any>;
  labelDictionary: any = {};

  constructor(route: ActivatedRoute,
               private sharedService: SharedService,
               private cd: ChangeDetectorRef) {
    this.terms = route.snapshot.data['dashbardTermList'];
    this.title = 'Dashboard';
    this.view = undefined;
    this.requestTypeData = new Array();
    this.setColorScheme( 'vivid' );
  }

  onTermChanged(selected: Term) {
    this.selectedTerm = selected;
    this.sharedService.getDashboardData( this.selectedTerm ).subscribe( results => this.updateCharts(results) );
  }

  updateCharts(results ) {
    const requestTypesSummary = results['RequestType']  as Array<any>;
    const programsSummary = results['Program']  as Array<any>;
    const branchesSummary = results['Branch']  as Array<any>;

    this.requestTypeData = requestTypesSummary.map( data => ({ name: data.Name, value: data.Value }) );
    this.programsData = programsSummary.map( data => ({ name: data.Name, value: data.Value }) );
    this.branchesData = branchesSummary.map( data => ({ name: data.Name, value: data.Value }) );
    this.cd.detectChanges();
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = ChartColorSets.find(s => s.name === name);
  }

  setLabelFormatting(label: any): string {
    return `${label}`;
  }

  ngOnInit() {
    this.onTermChanged(this.terms[0]);
  }

}
