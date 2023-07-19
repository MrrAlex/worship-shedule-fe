import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: Record<string, any>) {
    return this.http.get<T>(url, {params})
  }

  post<T, P>(url: string, payload: P, params?: Record<string, any>) {
    return this.http.post<T>(url, payload, {params})
  }

  delete<T>(url: string, params?: Record<string, any>) {
    return this.http.delete<T>(url, {params})
  }
}
