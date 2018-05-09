import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { config } from '../config';

@Injectable()
export class PlayersService {
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private rootUrl = config.ROOT_URL + '/api/players';

  constructor(private http: Http) {}

  public answer(token: string, answer: any): Promise<any> {
   
    this.headers.set('x-access-token', token);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('questionId', answer.questionId);
    urlSearchParams.append('answer', answer.answer);
    urlSearchParams.append('userName:', answer.userName);
    urlSearchParams.append('studentId', answer.studentId);
    urlSearchParams.append('time', answer.time);
    let url = this.rootUrl + '/answer';

    return this.http
      .post(url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  public check(token: string, studentId: string): Promise<any> {
    this.headers.set('x-access-token', token);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);

    let url = this.rootUrl + '/check';

    return this.http
      .post(url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public checkSAT(token: string, studentId: string): Promise<any> {
    this.headers.set('x-access-token', token);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);

    let url = this.rootUrl + '/checkSAT';

    return this.http
      .post(url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
