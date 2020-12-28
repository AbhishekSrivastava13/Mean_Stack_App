import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }


  // tslint:disable-next-line: typedef
  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  // tslint:disable-next-line: typedef
  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }
  // tslint:disable-next-line: typedef
  patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }
  // tslint:disable-next-line: typedef
  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
