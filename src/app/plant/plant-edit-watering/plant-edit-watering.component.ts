import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import * as dayjs from 'dayjs';
import { Router } from '@angular/router';
import { Plant } from '@prisma/client';

@Component({
  selector: 'plant-edit-watering',
  templateUrl: './plant-edit-watering.component.html',
  styleUrls: ['./plant-edit-watering.component.scss']
})
export class PlantEditWateringComponent implements OnInit {
  @Input() plantId!: number;
  @Input() waterFreq?: number | null;
  @Input() waterLast?: any;
  waterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.waterForm = this.fb.group({
      waterFreq: [],
      waterLast: [dayjs().format('YYYY-MM-DD')]
    })
  }

  ngOnInit(): void {
    this.waterForm.setValue({
      waterFreq: this.waterFreq,
      waterLast: dayjs(this.waterLast).format('YYYY-MM-DD')
    })
  }

  submit(): void {
    const plant: Plant = this.waterForm.value;
    plant.id = this.plantId;
    
    this.api.updatePlant(plant).subscribe({
      next: (data: any) => {
        if (data.msg === 'PLANT_UPDATED') {
          this.router.navigate(['/plant', this.plantId]);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
