import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { User, Location, Plant, Photo } from 'src/app/intefaces';
import { endpoint } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions: any = {};

  constructor(private http: HttpClient) {
    this.httpOptions.withCredentials = true;
  }

  endpoint = (path: string) => {
    return `${endpoint}/${path}`;
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.endpoint('user'))
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.endpoint('user/signin'), { username, password });
  }

  logOut(): Observable<any> {
    return this.http.get<any>(this.endpoint('user/logout'));
  }

  // getModel(model: BaseItem, id: number, path: string, query?: any): Observable<any> {
  //   let queryPath = '';
  //   if (query) queryPath = Object.keys(query).map((k, v) => [k, v].join('=')).join('&');

  //   return this.http.get<typeof model>(this.endpoint(`${path}/${id}${queryPath ? `?${queryPath}` : null}`)).pipe(
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

    return this.http.get<Location>(this.endpoint(url)).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }

  // retrieve location list for current user
  getLocationList(options?: any): Observable<Location[]> {
    let url = 'location';

    if (options) {
      if (options.plantCount) url += `?plantcount=true`;
      else url += `?plants=${(options.plants ? 'true' : 'false')}&limit=${(options.limit ? options.limit : 3)}`;
    }

    return this.http.get<Location[]>(this.endpoint(url));
  }

  /**
   * Creates a new Location or updates an existing one.
   * @param location The location to be upserted
   * @param update Whether we're creating (false/null) or updating (true) an existing one.
   * @returns An observable with the server response.
   */
  upsertLocation(location: Location, update?: boolean): Observable<any> {
    let observable;
    const form = new FormData();

    form.append('name', location.name);
    form.append('light', location.light);
    form.append('public', location.public.toString());
    form.append('picture', location.pictureFile);
    if (location.id) form.append('id', location.id.toString());

    if (update) observable = this.http.put<Location>(this.endpoint('location'), form);
    else observable = this.http.post<Location>(this.endpoint('location'), form);

    return observable.pipe(
      map((data: any) => {
        if ((data.msg === 'LOCATION_CREATED') || (data.msg === 'LOCATION_UPDATED')) {
          return data;
        }
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
    return this.http.get<Plant>(this.endpoint(`plant/${id}`)).pipe(
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
    return this.http.get<Photo>(this.endpoint(`photo/${id}`)).pipe(
      map(data => data),
      catchError((HttpError: HttpErrorResponse) => {
        if (HttpError.error.msg) return throwError(() => { return { msg: HttpError.error.msg, code: HttpError.status } })
        else return throwError(() => undefined);
      })
    );
  }
}
