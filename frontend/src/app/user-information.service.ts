import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { IceLoginCredentials } from './ice-login-credentials'

@Injectable()
export class UserInformationService {

  constructor(private _authHttp: AuthHttp) { }

  updateIceLoginInformation(credentials: IceLoginCredentials) {
    const ret = this._authHttp.put('/rest/api/ice-user/', credentials)
      .map(res => res.json());
    return ret;    
  }

  getIceLoginInformation(): Observable<IceLoginCredentials> {
    const ret = this._authHttp.get('/rest/api/ice-user/')
      .map(res => res.json());
    return ret;
  }
}
