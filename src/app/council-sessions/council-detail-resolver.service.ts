import { CouncilDetail } from './../models/council-detail';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CouncilService } from './council.service';

import 'rxjs/add/Observable/of';

@Injectable()
export class CouncilDetailResolver implements Resolve<CouncilDetail> {

  constructor ( private councilService: CouncilService,
                private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<CouncilDetail> {
    const id = route.params['id'];

    if (isNaN(+id)) {
      console.log(`Id was not a valid number: ${id}`);
      this.router.navigate(['/actas']);
      return Observable.of(null);
    }

    return this.councilService.getCouncilDetail( id );
  }

}
