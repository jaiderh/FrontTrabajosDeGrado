import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Template } from './template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private BASE_PATH = 'templates';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  constructor(private http: HttpClient) { }

  get(code: string): Observable<Template> {
    return this.http.get<Template>( `${this.BASE_URL}/${code}`);
  }

  save(template: Template): Observable<string> {
    return this.http.post<string>(this.BASE_URL, template);
  }
}
