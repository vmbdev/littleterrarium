import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  links$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  prev: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // FIXME: identify pages and allow appending to a certain one (i.e. plants to location)
    this.router.events
    .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(() => {
      this.prev = this.links$.getValue();
      this.links$.next([]);
    })
  }

  setNavigation(links: any[], append: boolean = false): void {
    if (append) this.links$.next(this.prev.concat([...links]));
    else this.links$.next(links);
  }

}
