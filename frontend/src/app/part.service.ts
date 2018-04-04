import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable }  from 'rxjs/Rx';
import { Router } from '@angular/router';
import { BaseAPI } from './base-api';
import { Part } from './part';

@Injectable()
export class PartService extends BaseAPI<Part> {
  constructor(
      _authHttp: AuthHttp,
      _router: Router) {
    super(_authHttp, _router, 'parts')
  }

  create(part: Part): Observable<Part> {
    const res = this._authHttp
                  .post(this.getFullUrl(),
                        JSON.stringify(part),
                        {headers: this.composeHeader()})
                  .map(res => res.json());
    return res;
  }
}

@Injectable()
export class IcePartService extends BaseAPI<Part> {
  constructor(
      _authHttp: AuthHttp,
      _router: Router) {
    super(_authHttp, _router, 'ice-parts')
  }
}
