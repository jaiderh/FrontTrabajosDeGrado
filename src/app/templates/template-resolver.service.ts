import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Template } from './template';
import { TemplateService } from './template.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateResolver implements Resolve<Template> {

  constructor(private templateService: TemplateService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Template | Observable<Template> | Promise<Template> {
    const code = route.paramMap.get('code');
    return this.templateService.get(code);
  }
}
