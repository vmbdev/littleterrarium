import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  private id!: number;
  isValidId!: boolean;
  location!: Location;

  constructor(
    private route: ActivatedRoute,
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

}
