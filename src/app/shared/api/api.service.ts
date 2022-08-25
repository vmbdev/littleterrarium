import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, Location } from '@prisma/client';
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
}
