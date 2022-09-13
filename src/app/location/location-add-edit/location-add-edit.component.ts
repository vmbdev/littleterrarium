import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
      name: ['', Validators.required],
      light: ['FULLSUN', Validators.required],
      public: [true, Validators.required],
      pictureFile: [],
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

    if (insert) {
      insert.subscribe({
        next: (res: any) => {
          if (res.msg === 'LOCATION_CREATED') this.router.navigate([`location/${res.location.id}`]);
          else if (res.msg === 'LOCATION_UPDATED') this.router.navigate([`location/${data.id}`]);
        },
        error: (err) => {
          if (err.msg === 'IMG_NOT_VALID') console.log('Image not valid');
          else if (err.msg === 'INCORRECT_FIELD') {
            console.log(`Incorrect field: ${err.data.field}.`);

            if (err.data.values) console.log(`Possible values: ${err.data.values.join(',')}`);
          }
        }
      })
    }
  }

  fileChange(files: File[]) {
    this.locationForm.patchValue({
      pictureFile: files[0]
    });
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
