import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    this.apiService.getCurrentUser().subscribe({
      next: () => { this.signedIn$.next(true) },
      error: () => { this.signedIn$.next(false) }
    });
  }

  signIn(username: string, password: string): Observable<any> {
    return this.apiService.signIn(username, password).pipe(
      map(res => {
        this.signedIn$.next(true);
        return res;
      }),
      catchError((HttpError: HttpErrorResponse) => {
        this.signedIn$.next(false);
        return throwError(() => HttpError.error);
      }),
    );
  }

  logOut(): Observable<any> {
    this.signedIn$.next(false);
  
    return this.apiService.logOut().pipe(catchError(() => of(null)));
  }
}
