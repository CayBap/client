import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { config } from '../config';

@Injectable()
export class PlaygroundsService {
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private rootUrl = config.ROOT_URL + '/api/playgrounds';

  constructor(private http: Http) {}

  public played(token: string): Promise<any> {
    this.headers.set('x-access-token', token);

    let url = this.rootUrl + '/played';

    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public playGround(token: string, roundid: string): Promise<any> {
    this.headers.set('x-access-token', token);

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('roundid', roundid);

    return this.http
      .post(this.rootUrl, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public play(token: string, pid: string): Promise<any> {
    this.headers.set('x-access-token', token);

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('pid', pid);

    let url = this.rootUrl + '/play';

    return this.http
      .post(url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  // public next(token: string): Promise<any> {
  //   this.headers.set('x-access-token', token);
  //   return this.http
  //     .post(this.rootUrl + '/next', { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }
  public answer(token: string, answer: string): Promise<any> {
    this.headers.set('x-access-token', token);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('answer', answer);
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

  public checkLogin(token: string, studentId: string): Promise<any> {
    this.headers.set('x-access-token', token);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('studentId', studentId);

    let url = this.rootUrl + '/checkLogin';

    return this.http
      .post(url, urlSearchParams.toString(), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  public scoreboard(): Promise<any> {
    let url = this.rootUrl + '/scoreboard';

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
