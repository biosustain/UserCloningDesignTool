import { Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class BaseAPI<T> {
  /*
   * Base methods for interaction with backend
   */
  private baseUrl = '/rest/api/';
  private fullUrl: string;

  constructor(protected _authHttp: AuthHttp,
              private _router: Router,
              private extendedUrl: string) {
    this.fullUrl = this.baseUrl + extendedUrl + '/';
  }

  protected composeHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  getAll(): Observable<T[]> {
    const records$ = this._authHttp
                       .get(this.getFullUrl(), {headers: this.composeHeader()})
                       .map(this.mapRecords).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    return records$;
  }

  get(id: number): Observable<T> {
    const self = this;
    const record$ = this._authHttp
                      .get(this.getFullUrl() + id + '/', {headers: this.composeHeader()})
                      .map((res) => {return <T>res.json(); })
                      .catch((error: any) => {
                        self._router.navigate(['/404'])
                        return Observable.throw(error.json().error || 'Server error');
                      });
    return record$;
  }

  search(q: string): Observable<T[]> {
    const record$ = this._authHttp
                      .get(this.getFullUrl() + `?search=${q}`, {headers: this.composeHeader()})
                      .map(this.mapRecords)
                      .catch((error: any) => Observable.throw(error || 'Server error'));
    return record$;
  }

  protected getFullUrl(): string {
    return this.fullUrl;
  }

  protected mapRecords(response: Response): T[] {
    return response.json()
                   .results
                   .map(r => <T>r);
  }
}
