import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Term } from './term';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardTermsResolver implements Resolve<Term[]> {
  constructor(private sharedService: SharedService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Term[] | Observable<Term[]> | Promise<Term[]> {
    return this.sharedService.getDashboardTerms();
  }
}
