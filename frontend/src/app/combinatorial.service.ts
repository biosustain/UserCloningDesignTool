import { Injectable } from '@angular/core';
import { Response, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Combinatorial } from './combinatorial'
import { BaseAPI } from './base-api';

@Injectable()
export class CombinatorialService extends BaseAPI<Combinatorial> {

  constructor(
      _authHttp: AuthHttp,
      _router: Router
    ) {
    super(_authHttp, _router, 'combinatorial');
  }

  create(combinatorial: Combinatorial): Observable<Combinatorial> {
    const res = this._authHttp
                  .post(this.getFullUrl(),
                        JSON.stringify(combinatorial),
                        {headers: this.composeHeader()})
                  .map(el => el.json());
    return res;
  }

  update(combinatorial: Combinatorial): Observable<Combinatorial> {
    const id = combinatorial.id
    const res = this._authHttp
                  .put(this.getFullUrl() + `${id}/`,
                    JSON.stringify(combinatorial),
                    {headers: this.composeHeader()})
                  .map(el => el.json());
    return res;
  }

  getCsv(combinatorial: Combinatorial): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'text/csv');

    const csvResp = this._authHttp
                        .get(this.getFullUrl() + combinatorial.id + '/csv/',
                             {headers: headers})
                        .map((res: Response) => res['_body'])
                        .catch((err: Response) => Observable.throw(err.json()));

    return csvResp;
  }

  getGenbank(combinatorial: Combinatorial): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const csvResp = this._authHttp
      .get(this.getFullUrl() + combinatorial.id + '/genbank/',
           {headers: headers})
      .map((res: Response) => res['_body'])
      .catch((err: Response) => Observable.throw(err.json()));

    return csvResp;
  }
}
