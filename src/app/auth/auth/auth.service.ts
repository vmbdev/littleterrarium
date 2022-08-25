import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, throwError } from 'rxjs';
import { ApiService } from '../../shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedIn: boolean = false;
  private backendChecked: boolean = false;

  constructor(private apiService: ApiService) { }

  isSignedIn(): Observable<boolean> {
    if (!this.backendChecked) {
      this.backendChecked = true;

      return this.apiService.getCurrentUser().pipe(
        map(() => {
          this.signedIn = true;
          return true;
        }),
        catchError(() => {
          this.signedIn = false;
          return of<boolean>(false);
        })
      );
    }

    else return of<boolean>(this.signedIn);
  }

  signIn(username: string, password: string): Observable<any> {
    return this.apiService.signIn(username, password).pipe(
      map(res => {
        this.signedIn = true;
        return res;
      }),
      catchError((HttpError: HttpErrorResponse) => {
        this.signedIn = false;
        return throwError(() => HttpError.error);
      }),
    );
  }

  logOut(): Observable<any> {
    this.signedIn = false;
  
    return this.apiService.logOut().pipe(catchError(() => of(null)));
  }
}
