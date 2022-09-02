import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { User, Location, Plant, Photo, BaseItem } from 'src/app/intefaces';
import { endpoint } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(endpoint('user'), { withCredentials: true })
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(endpoint('user/signin'), { username, password }, { withCredentials: true });
  }

  logOut(): Observable<any> {
    return this.http.get<any>(endpoint('user/logout'), { withCredentials: true });
  }

  // retrieve location list for current user
  getLocationList(plants?: boolean, limit?: number): Observable<Location[]> {
    const url = `location?plants=${(plants ? 'true' : 'false')}&limit=${(limit ? limit : 3)}`;

    return this.http.get<Location[]>(endpoint(url), { withCredentials: true });
  }

  getModel(model: BaseItem, id: number, path: string, query?: any): Observable<any> {
    let queryPath = '';
    if (query) queryPath = Object.keys(query).map((k, v) => [k, v].join('=')).join('&');

    return this.http.get<typeof model>(endpoint(`${path}/${id}${queryPath ? `?${queryPath}` : null}`), { withCredentials: true }).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  getLocation(id: number, plants?: boolean, limit?: number): Observable<Location> {
    const url = `location/${id}?plants=${plants ? 'true' : 'false'}&limit=${limit ? limit : 0}`;

    return this.http.get<Location>(endpoint(url), { withCredentials: true }).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(endpoint(`plant/${id}`), { withCredentials: true }).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(endpoint(`photo/${id}`), { withCredentials: true }).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }
}
 