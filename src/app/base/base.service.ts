

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BaseEntity} from './base';
import { map,delay, catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/map'

//@Injectable()
export abstract class BaseService<T extends BaseEntity> {

  entity_url :string;

  constructor(protected _http: Http, public url:string) {
    this.entity_url =   environment.serverUrl + '/api/' + url;
  }

  getRecords(): Observable<T[]> {
    console.log(this.entity_url)
    return this._http.get(this.entity_url)
    .pipe(map((response: Response) => <T[]> response.json())
    ,catchError(this.handleError));
  }

  getById(type_id: string): Observable<T> {
    return this._http.get((this.entity_url + '/' + type_id))
      .pipe(map((response: Response) => <T> response.json())
      ,catchError(this.handleError));
  }

  update(type_id: string, User: T): Observable<T> {
    const body = JSON.stringify(User);
    const headers = new Headers({'Content-Type': ' application/json;charset=UTF-8'});
    const options = new RequestOptions({headers: headers});
    return this._http.put((this.entity_url + '/' + type_id), body, options)
    .pipe(map((response: Response) => <T> response.json())
    ,catchError(this.handleError));
  }

  add(User: T): Observable<T> {
    const headers = new Headers();
    const body = JSON.stringify(User);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this._http.post(this.entity_url, body, {headers})
    .pipe(map((response: Response) => <T> response.json())
    ,catchError(this.handleError));
  }

  delete(type_id: string): Observable<number> {
    return this._http.delete(this.entity_url + '/' + type_id)
    .pipe(map((response: Response) => response.status)
    ,catchError(this.handleError));
  }


  private handleError(error: Response | any) {
    console.log('handleError log: ');
    let errMsg: string;
    if (error instanceof Response) {
      if (!(error.text() === '' )) {  // if response body not empty
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        console.log('binding errors header not empty');
        errMsg = error.headers.get('errors').toString();
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
