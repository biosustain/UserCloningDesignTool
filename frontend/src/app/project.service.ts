import { Injectable }                from '@angular/core';
import { Response, Headers, URLSearchParams }   from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { Observable }                from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Project }                   from './project';
import { BaseAPI }                   from './base-api';

@Injectable()
export class ProjectService extends BaseAPI<Project> {

  constructor(
      _authHttp: AuthHttp,
      _router: Router) { 
    super(_authHttp, _router, 'projects');
  }

  create(project: Project): Observable<Project> {
    const res = this._authHttp
                  .post(this.getFullUrl(),
                        JSON.stringify(project),
                        {headers: this.composeHeader()})
                  .map(el => el.json());
    return res;
  }

  getCsv(projectList?: Project[]): Observable<Response> {
    let idxList: number[];

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'text/csv');

    const params: URLSearchParams = new URLSearchParams();
    if (projectList) {
      idxList = projectList.map(el => el.id);  
    } else {
      idxList = [1, 2]
    }
    
    const csvResp = this._authHttp
                        .get(this.getFullUrl() + 'csv/' + '?project=' + JSON.stringify(idxList),
                             {headers: headers,
                              params: params})
                        .map((res: Response) => res['_body'])
                              .catch((err: Response) => Observable.throw(err.json()));

    return csvResp;
  }

  getGenbank(project: Project): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const csvResp = this._authHttp
      .get(this.getFullUrl() + project.id + '/genbank/',
           {headers: headers})
      .map((res: Response) => res['_body'])
      .catch((err: Response) => Observable.throw(err.json()));

    return csvResp;
  }

  update(project: Project): Observable<Project> {
    const id = project.id
    const res = this._authHttp
                  .put(this.getFullUrl() + `${id}/`,
                    JSON.stringify(project),
                    {headers: this.composeHeader()})
                  .map(el => el.json());
    return res;
  }
}

