import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, Plant } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss']
})
export class PlantAddComponent implements OnInit {
  plantForm: FormGroup;
  locationId!: number;
  location!: Location;
  photos: File[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.plantForm = this.fb.group({
      specieId: [],
      customName: [],
      public: [true, Validators.required]
    })
  }

  ngOnInit(): void {
    this.locationId = +this.route.snapshot.params['locationId'];

    if (this.locationId) {
      this.api.getLocation(this.locationId).subscribe({
        next: (location: Location) => { this.location = location },
        error: (err) => { console.error(err) }
      });
    }
  }

  fileChange(files: File[]) {
    this.photos = files;
  }

  selectSpecieId(id: any): void {
    this.plantForm.patchValue({
      specieId: id
    });
  }

  submit() {
    const plant: Plant = this.plantForm.value;
    plant.locationId = this.locationId;

    this.api.createPlant(plant).subscribe({
      next: (data: Plant) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
