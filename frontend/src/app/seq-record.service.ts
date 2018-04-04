import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseAPI } from './base-api';
import { SeqRecord } from './seq-record';

@Injectable()
export class SeqRecordService extends BaseAPI<SeqRecord> {

  constructor(
    _authHttp: AuthHttp,
    _router: Router) { 
    super(_authHttp, _router, 'seqrecords');
  }
}
