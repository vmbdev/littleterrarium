import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Location, Light } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'location-add-edit',
  templateUrl: './location-add-edit.component.html',
  styleUrls: ['./location-add-edit.component.scss']
})
export class LocationAddEditComponent implements OnInit {
  lightOptions = Light;
  locationForm: FormGroup;
  id?: number;
  createNew: boolean = false;
  data = {};

  created: boolean = false;
  edited: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.locationForm = this.fb.group({
      name: [''],
      light: ['FULLSUN'],
      public: [true]
    })
  }

  submit() {
    const data: Location = this.locationForm.value;
    let insert: Observable<any> | undefined;

    if (this.createNew) insert = this.api.createLocation(data);
    else if (this.id) {
      data.id = this.id;
      insert = this.api.editLocation(data);
    }

    // TODO: for edit
    if (insert) {
      insert.subscribe({
        next: (location: Location) => { this.router.navigate([`location/${location.id}`]) },
        error: (err) => { console.log(err)}
      })
    }
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['locationId'];
    this.createNew = !paramId;

    // editing
    if (!this.createNew) {
      this.id = +paramId;

      if (this.id) {
        this.api.getLocation(this.id).subscribe({
          next: (location: Location) => {
            Object.keys(this.locationForm.value).forEach((key) => {
              this.locationForm.controls[key].setValue(location[key as keyof Location]);
            })
          },
          error: () => {

          }
        })
      }
    }
  }

}
