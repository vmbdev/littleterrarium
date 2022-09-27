import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  private id!: number;
  isValidId!: boolean;
  location!: Location;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('locationId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.isValidId = true;

      this.apiService.getLocation(this.id, true).subscribe({
        next: (data) => { this.location = data },
        error: (error) => {
          if (error.msg === 'LOCATION_NOT_FOUND') this.isValidId = false;
        }
      });
    }
    else this.isValidId = false;
  }

  edit(): void {
    this.router.navigate(['/location', 'edit', this.id]);
  }

  delete(): void {
    this.apiService.deleteLocation(this.id).subscribe({
      next: (data) => {
        if (data.msg === 'LOCATION_REMOVED') this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.msg === 'LOCATION_NOT_VALID') console.log('error');
      }
    })
  }
}
