import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { User, Location, Plant, Photo, BaseItem } from 'src/app/intefaces';
import { endpoint } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: any = {};

  constructor(private http: HttpClient) {
    this.httpOptions.withCredentials = true;
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(endpoint('user'))
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(endpoint('user/signin'), { username, password });
  }

  logOut(): Observable<any> {
    return this.http.get<any>(endpoint('user/logout'));
  }

  // getModel(model: BaseItem, id: number, path: string, query?: any): Observable<any> {
  //   let queryPath = '';
  //   if (query) queryPath = Object.keys(query).map((k, v) => [k, v].join('=')).join('&');

  //   return this.http.get<typeof model>(endpoint(`${path}/${id}${queryPath ? `?${queryPath}` : null}`)).pipe(
  //     map(data => data),
  //     catchError((HttpError: HttpErrorResponse) => {
  //       if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
  //       else return throwError(() => undefined);
  //     })
  //   );
  // }

  /**
   * Location related calls
   */

  getLocation(id: number, plants?: boolean, limit?: number): Observable<Location> {
    const url = `location/${id}?plants=${plants ? 'true' : 'false'}&limit=${limit ? limit : 0}`;

    return this.http.get<Location>(endpoint(url)).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  // retrieve location list for current user
  getLocationList(plants?: boolean, limit?: number): Observable<Location[]> {
    const url = `location?plants=${(plants ? 'true' : 'false')}&limit=${(limit ? limit : 3)}`;

    return this.http.get<Location[]>(endpoint(url));
  }

  upsertLocation(location: Location, update?: boolean): Observable<any> {
    let observable;

    if (update) observable = this.http.put<Location>(endpoint('location'), location);
    else observable = this.http.post<Location>(endpoint('location'), location);

    return observable.pipe(
      map((data: any) => {
        if ((data.msg === 'LOCATION_CREATED') && (data.location)) return data.location;
        else if (data.msg === 'LOCATION_UPDATED') return data.msg;
        else return throwError(() => 'Server error');
      }),
      catchError(err => {
        return throwError(() => (
          {
            msg: err.error.msg,
            data: err.error.data ? err.error.data : undefined,
            code: err.status.code ? err.status.code : undefined
          }
        ));
      })
    )
  }

  createLocation(location: Location): Observable<any> {
    return this.upsertLocation(location);
  }

  editLocation(location: Location): Observable<any> {
    return this.upsertLocation(location, true);
  }

  /**
   * Plant related calls
   */

  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(endpoint(`plant/${id}`)).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  /**
   * Photo related calls
   */

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(endpoint(`photo/${id}`)).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }
}
