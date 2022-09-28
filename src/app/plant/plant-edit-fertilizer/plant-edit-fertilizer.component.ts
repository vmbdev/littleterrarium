import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { Plant } from 'src/app/intefaces';

@Component({
  selector: 'plant-edit-fertilizer',
  templateUrl: './plant-edit-fertilizer.component.html',
  styleUrls: ['./plant-edit-fertilizer.component.scss']
})
export class PlantEditFertilizerComponent implements OnInit {
  @Input() plantId!: number;
  @Input() fertFreq?: number | null;
  @Input() fertLast?: any;
  fertForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.fertForm = this.fb.group({
      fertFreq: [],
      fertLast: [dayjs().format('YYYY-MM-DD')]
    })
  }

  ngOnInit(): void {
    this.fertForm.setValue({
      fertFreq: this.fertFreq,
      fertLast: dayjs(this.fertLast).format('YYYY-MM-DD')
    })
  }

  submit(): void {
    const plant: Plant = this.fertForm.value;
    plant.id = this.plantId;
    
    this.api.updatePlant(plant).subscribe({
      next: (data: any) => {
        if (data.msg === 'PLANT_UPDATED') {
          console.log(data)
          this.router.navigate(['/plant', this.plantId]);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
