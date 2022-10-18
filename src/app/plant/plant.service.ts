import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Plant } from '../interfaces';
import { ApiService } from '../shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  plant$: BehaviorSubject<Plant> = new BehaviorSubject<Plant>({} as Plant);

  constructor(private api: ApiService) { }

  get(id: number): Observable<any> {
    return this.api.getPlant(id).pipe(
      map((plant: Plant) => {
        this.plant$.next(plant);

        return plant;
      }),
      catchError((HttpError: HttpErrorResponse) => {
        this.plant$.next({} as Plant);

        return throwError(() => HttpError.error);
      })
    );
  }

  update(plant: Plant): Observable<any> {
    return this.api.updatePlant(plant).pipe(
      map((plant: Plant) => {
        const current = this.plant$.getValue();
        plant.photos = current.photos;
        this.plant$.next(plant);
      }),
      catchError((HttpError: HttpErrorResponse) => {
        this.plant$.next({} as Plant);

        return throwError(() => HttpError.error);
      })
    );
  }
}
