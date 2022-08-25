import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, Light } from '@prisma/client';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  list!: Location[];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getLocationList().subscribe((list) => { this.list = list });
  }

  onLocationClick(location: number): void {
    this.router.navigate(['/location', location]);
  }

}
