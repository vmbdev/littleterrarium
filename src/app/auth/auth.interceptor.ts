import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          console.log('forbidden');
          return throwError(() => new Error('Forbidden'))
        }

        return throwError(() => err);
      })
    );
  }
}
