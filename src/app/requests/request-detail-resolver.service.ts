import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRequestDetail } from '../models/request';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailResolver implements Resolve<IRequestDetail> {

  constructor(private requestService: RequestService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : IRequestDetail | Observable<IRequestDetail> | Promise<IRequestDetail> {
    const id = +route.params['id'];

    if (id === 0) {
      return new IRequestDetail();
    } else {
      return this.requestService.get(id);
    }
  }
}
