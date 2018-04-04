import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { async } from 'rxjs/scheduler/async';
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map';

import { LoginCredentials } from './login-credentials';

@Injectable()
export class JwtAuthenticationService {
  private _jwtHelper: JwtHelper = new JwtHelper();
  private refreshSubscription: Subscription;

  constructor(
    private _http: HttpClient,
    private _authHttp: AuthHttp) { }

  login(credentials: LoginCredentials) {
    const ret = this._http.post('/rest/api/token-auth/', credentials)
    // The token is set in the login component along with the ice_token
    return ret;
  }

  refreshToken(state) {
    const token = {
      token: localStorage.getItem('token')
    }
    const ret = state._authHttp.post('/rest/api/token-refresh/', token)
      .map(el => el.json())
      .subscribe(
        data => {
          localStorage.setItem('token', data['token']);
          state.scheduleRefresh();
        },
        error => {
        }
      )
    
    return ret;
  }

  scheduleRefresh() {
    this._authHttp.tokenStream.subscribe(
      token => {
        if (token) {
          const now: number = new Date().valueOf();
          const jwtExp = this._jwtHelper.decodeToken(token).exp;
          const exp = new Date(0);
          exp.setUTCSeconds(jwtExp);
          const delay = exp.valueOf() - now - 2000;
          async.schedule(this.refreshToken, delay, this)
        }
      },
        err => console.log(err)
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ice_token');
  }
}
