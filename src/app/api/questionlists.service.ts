import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { config } from '../config';

@Injectable()
export class QuestionlistsService {
  // constructor() { }
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private rootUrl = config.ROOT_URL + '/api/questionlists/';

  constructor(private http: Http) {}

  public getList(token: string, _id: string): Promise<any> {
    this.headers.set('x-access-token', token);

    let url = this.rootUrl + _id;

    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
