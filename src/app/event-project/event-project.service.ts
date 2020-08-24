import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventProjectService {

  private BASE_PATH = 'proyectos-de-grado/eventos-proyecto/';
  private BASE_URL = `${environment.apiURL}${this.BASE_PATH}`;

  constructor(private http: HttpClient) { }

  getProject(id: number): Observable<any> {
    return this.http.get<any>( `${this.BASE_URL}/buscar-proyecto?id=${id}` )
                      .pipe(
                        map( resp => {
                          const result = resp.Result;
                          result.autores = [];

                          result.Miembros.forEach(miembro => {
                            if ( miembro.Rol === 'Autor' ) {
                              result.autores.push(miembro);
                            } else if ( miembro.Rol === 'Director' ) {
                              result.director = miembro;
                            }
                          });

                          return result;
                        })
                      );
  }

  addEventProject( eventData: any): Observable<any> {
    return this.http.post(  `${this.BASE_URL}`, eventData );

  }

  listProjects(): Observable<any> {
    return this.http.get<any>( `${this.BASE_URL}/buscar-proyectos`)
                    .pipe(
                      map( resp => {

                        const result = resp.Result;

                        result.forEach(proyecto => {

                          proyecto.Autores = '';
                          proyecto.Director = {};

                          proyecto.Miembros.forEach(miembro => {
                            if ( miembro.Rol === 'Autor' ) {
                              if ( result.Autores ) { result.Autores += '<br/>'; }
                              proyecto.Autores += `${miembro.Nombres}  ${miembro.Apellidos}`;
                            } else if ( miembro.Rol === 'Director' ) {
                              proyecto.Director.NombreCompleto = `${miembro.Nombres}  ${miembro.Apellidos}`;
                              proyecto.Director.Tipo = `Director ${miembro.DetalleRol}`;
                            }
                          });
                        });

                        console.log(result);
                        return result;
                      })
                    );
  }

  listEventProject(): Observable<any> {
    return this.http.get<any>( `${this.BASE_URL}/buscar-eventos`)
                    .pipe(
                      map( resp => {

                        const result = resp.Result;

                        result.Autores = '';
                        result.Director = '';

                        result.forEach(evento => {
                          evento.ProyectoDeGrado.Miembros.forEach(miembro => {
                            if ( miembro.Rol === 'Autor' ) {
                              if ( result.Autores ) { result.Autores += '<br/>'; }
                              result.Autores += `${miembro.Nombres}  ${miembro.Apellidos}`;
                            } else if ( miembro.Rol === 'Autor' ) {
                              result.Director += `${miembro.Nombres}  ${miembro.Apellidos}`;
                              result.Director += `<br/>Director ${miembro.EtiquetaDetalleRol}`;
                            }
                          });
                        });


                        return result;
                      })
                    );
  }
}
