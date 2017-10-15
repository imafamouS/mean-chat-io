import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HeaderBuilder } from '../shared/header.request.buider';

@Injectable()
export class UserService {

  private headerBuilder = new HeaderBuilder();

  private headers;
  private options;

  constructor(private http: Http) {

  }

  login(credentials): Observable<any> {
    this.headers = this.headerBuilder.getDefaultHeader();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.post('/api/users/login', JSON.stringify(credentials), this.options);
  }

  count(): Observable<any> {
    this.headers = this.headerBuilder.getDefaultHeader();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.get('/api/users').map(res => res.json());
  }

  register(user): Observable<any> {
    this.headers = this.headerBuilder.getDefaultHeader();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.post('/api/users', JSON.stringify(user), this.options);
  }

  getUserById(user): Observable<any> {
    if (user.role !== 'admin') {
      return null;
    }
    this.headers = this.headerBuilder.getHeaderWithToken();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.get(`/api/user/${user._id}`, this.options).map(res => res.json());
  }

  updateUser(user): Observable<any> {
    this.headers = this.headerBuilder.getHeaderWithToken();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    this.headers = this.headerBuilder.getHeaderWithToken();
    this.options = new RequestOptions({ headers: this.headers });

    return this.http.delete(`/api/user/${user._id}`, this.options);
  }
}
