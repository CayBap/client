import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { config } from '../config';

@Injectable()
export class RoundsService {
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private rootUrl = config.ROOT_URL + '/api/rounds';

  constructor(private http: Http) { }

  public available(token: string): Promise<any> {

    this.headers.set('x-access-token', token);
    
    let url = this.rootUrl + '/available';

    return this.http
    .get(url, {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
