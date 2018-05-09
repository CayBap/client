import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { config } from '../config';

@Injectable()
export class UsersService {

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private heroesUrl = config.ROOT_URL + '/api/users';

  constructor(private http: Http) { }

  public checkLogin(token: string): Promise<any> {

    var url = this.heroesUrl + '/check';
    
    this.headers.set('x-access-token', token);

    return this.http
    .get(url, {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public signUp(phone: string, studentId: string, pass: string, name: string): Promise<any> {
    let signUpUrl = this.heroesUrl + '/self';

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('phone', phone);
    urlSearchParams.append('studentId', studentId);
    urlSearchParams.append('pass', pass);
    urlSearchParams.append('name', name);
    
    return this.http
    .post(signUpUrl, urlSearchParams.toString(), {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
